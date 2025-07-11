import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { CreditCardIcon, LockIcon, CheckIcon, ChevronRightIcon, AlertCircleIcon, ArrowLeftIcon, ShieldIcon, ChevronsUpDownIcon, RefreshCwIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const planDetails = {
  free: {
    name: 'Free',
    price: '0€',
    billingPeriod: '',
    features: ['Création du profil complet', '1 CV à personnaliser', 'Accès limité au coaching', "Aperçu de l'AutoPilot"]
  },
  starter: {
    name: 'Starter',
    price: '12€',
    billingPeriod: '/mois',
    features: ['3 CV actifs personnalisables', '3 lettres générées par mois', '2 entretiens simulés', 'AutoPilot pour 3 offres/mois']
  },
  pro: {
    name: 'Pro',
    price: '29€',
    billingPeriod: '/mois',
    features: ['CV et lettres illimités', 'Coaching complet personnalisé', 'Feedback IA avancé', 'AutoPilot illimité avec relances']
  },
  premium: {
    name: 'Premium',
    price: '59€',
    billingPeriod: '/mois',
    features: ['Tout ce qui est inclus dans Pro', 'Préparation orale premium', 'Mentor IA simulé', 'Accès prioritaire aux offres exclusives']
  },
  onetime: {
    name: 'Forfait unique',
    price: '19€',
    billingPeriod: '',
    features: ['Accès à toutes les fonctionnalités Pro pendant 1 mois', 'Sans engagement ni renouvellement', 'Idéal pour une recherche ponctuelle']
  }
};
type PaymentScreenProps = {
  onComplete: () => void;
  onBack: () => void;
  selectedPlan: string;
  variant?: 'build' | 'prepare' | 'act';
};
export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  onComplete,
  onBack,
  selectedPlan = 'pro',
  variant = 'build'
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [couponCode, setCouponCode] = useState('');
  const [showCouponField, setShowCouponField] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: ''
  });
  // Get plan details based on selected plan
  const plan = planDetails[selectedPlan] || planDetails.pro;
  // Calculate prices
  const basePrice = parseInt(plan.price.replace('€', ''));
  const yearlyDiscount = billingPeriod === 'yearly' ? 0.2 : 0; // 20% discount for yearly
  const yearlyPrice = basePrice * 12 * (1 - yearlyDiscount);
  const discountedPrice = couponApplied ? basePrice * (1 - couponDiscount) : basePrice;
  const finalPrice = billingPeriod === 'yearly' ? yearlyPrice / 12 : discountedPrice;
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    const newErrors = {
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvc: ''
    };
    let hasErrors = false;
    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.replace(/\s+/g, '').length < 16) {
        newErrors.cardNumber = 'Numéro de carte invalide';
        hasErrors = true;
      }
      if (!cardName.trim()) {
        newErrors.cardName = 'Nom requis';
        hasErrors = true;
      }
      if (!expiry.trim() || expiry.length < 5) {
        newErrors.expiry = 'Date invalide';
        hasErrors = true;
      }
      if (!cvc.trim() || cvc.length < 3) {
        newErrors.cvc = 'CVC invalide';
        hasErrors = true;
      }
    }
    setErrors(newErrors);
    if (!hasErrors) {
      setIsProcessing(true);
      // Simulate payment processing
      setTimeout(() => {
        // Play success sound
        const audio = new Audio('/sounds/payment-success.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Audio playback prevented:', e));
        // Trigger haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 200]);
        }
        setIsProcessing(false);
        onComplete();
      }, 2000);
    }
  };
  // Apply coupon code
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'welcome') {
      setCouponApplied(true);
      setCouponDiscount(0.15); // 15% discount
      // Play success sound
      const audio = new Audio('/sounds/coupon-applied.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Audio playback prevented:', e));
    }
  };
  const getVariantStyles = () => {
    switch (variant) {
      case 'build':
        return {
          bgGradient: 'bg-gradient-to-r from-cream to-build-bg',
          borderColor: 'border-build-ui',
          textColor: 'text-build-text',
          buttonVariant: 'build',
          accentColor: 'text-amber-500',
          bgAccent: 'bg-amber-500'
        };
      case 'prepare':
        return {
          bgGradient: 'bg-gradient-to-r from-prepare-bg to-prepare-bg/90',
          borderColor: 'border-prepare-accent/30',
          textColor: 'text-prepare-text',
          buttonVariant: 'prepare',
          accentColor: 'text-lavender-300',
          bgAccent: 'bg-lavender-300'
        };
      case 'act':
        return {
          bgGradient: 'bg-gradient-to-r from-act-bg to-act-bg/90',
          borderColor: 'border-act-accent/30',
          textColor: 'text-white',
          buttonVariant: 'act',
          accentColor: 'text-red-500',
          bgAccent: 'bg-red-500'
        };
      default:
        return {
          bgGradient: 'bg-white',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-900',
          buttonVariant: 'primary',
          accentColor: 'text-blue-500',
          bgAccent: 'bg-blue-500'
        };
    }
  };
  const styles = getVariantStyles();
  return <Card variant={variant} className={`p-0 overflow-hidden ${styles.bgGradient} border ${styles.borderColor} w-full max-w-3xl`}>
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className={`text-2xl md:text-3xl font-light ${styles.textColor}`}>
              Finaliser votre abonnement
            </h2>
            <p className={`mt-1 ${styles.textColor}`}>
              {selectedPlan === 'onetime' ? 'Accédez à toutes les fonctionnalités pendant 1 mois sans engagement' : 'Vous êtes à un pas de débloquer tout le potentiel de votre carrière'}
            </p>
          </div>
          <motion.button onClick={onBack} className={`p-2 rounded-full hover:bg-black/10 ${styles.textColor}`} aria-label="Retour" whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }}>
            <ArrowLeftIcon className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="grid md:grid-cols-5 gap-6">
          {/* Payment form - 3 columns */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Mode de paiement</h3>
                <div className="flex items-center">
                  <LockIcon className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-gray-500">
                    Paiement sécurisé
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <button className={`flex-1 py-2 px-3 rounded-lg border ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'} transition-colors flex items-center justify-center`} onClick={() => setPaymentMethod('card')}>
                    <CreditCardIcon className="w-5 h-5 mr-2 text-gray-700" />
                    <span className="text-sm font-medium text-gray-800">
                      Carte bancaire
                    </span>
                    {paymentMethod === 'card' && <CheckIcon className="w-4 h-4 text-blue-500 ml-2" />}
                  </button>
                  <button className={`flex-1 py-2 px-3 rounded-lg border ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'} transition-colors flex items-center justify-center`} onClick={() => setPaymentMethod('paypal')}>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.5 8.5H18.0417C17.5361 8.5 17.0745 8.76855 16.8465 9.20507L14.6667 13.5H17.5C18.0055 13.5 18.4671 13.2314 18.6951 12.7949L20.5 9.5C20.8333 8.83333 20.3333 8 19.5 8.5Z" fill="#0070E0" />
                      <path d="M10.5 8.5H12.0417C12.5361 8.5 12.9745 8.76855 13.2025 9.20507L15.3333 13.5H12.5C11.9945 13.5 11.5329 13.2314 11.3049 12.7949L9.5 9.5C9.16667 8.83333 9.66667 8 10.5 8.5Z" fill="#003087" />
                      <path d="M6.5 15.5H8.0417C8.53615 15.5 8.99772 15.2314 9.2257 14.7949L11.3333 10.5H8.5C7.99447 10.5 7.53289 10.7686 7.30491 11.2051L5.5 14.5C5.16667 15.1667 5.66667 16 6.5 15.5Z" fill="#001C64" />
                    </svg>
                    <span className="text-sm font-medium text-gray-800">
                      PayPal
                    </span>
                    {paymentMethod === 'paypal' && <CheckIcon className="w-4 h-4 text-blue-500 ml-2" />}
                  </button>
                </div>
                <AnimatePresence mode="wait">
                  {paymentMethod === 'card' ? <motion.form key="card-form" initial={{
                  opacity: 0,
                  height: 0
                }} animate={{
                  opacity: 1,
                  height: 'auto'
                }} exit={{
                  opacity: 0,
                  height: 0
                }} transition={{
                  duration: 0.3
                }} className="space-y-4 overflow-hidden" onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Numéro de carte
                        </label>
                        <div className="relative">
                          <input id="cardNumber" type="text" className={`w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="1234 5678 9012 3456" value={cardNumber} onChange={e => setCardNumber(formatCardNumber(e.target.value))} maxLength={19} />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4" />
                          </div>
                        </div>
                        {errors.cardNumber && <p className="mt-1 text-xs text-red-500">
                            {errors.cardNumber}
                          </p>}
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom sur la carte
                        </label>
                        <input id="cardName" type="text" className={`w-full px-3 py-2 border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="Jean Dupont" value={cardName} onChange={e => setCardName(e.target.value)} />
                        {errors.cardName && <p className="mt-1 text-xs text-red-500">
                            {errors.cardName}
                          </p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                            Date d'expiration
                          </label>
                          <input id="expiry" type="text" className={`w-full px-3 py-2 border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="MM/AA" value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} maxLength={5} />
                          {errors.expiry && <p className="mt-1 text-xs text-red-500">
                              {errors.expiry}
                            </p>}
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                            CVC
                          </label>
                          <input id="cvc" type="text" className={`w-full px-3 py-2 border ${errors.cvc ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="123" value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, ''))} maxLength={4} />
                          {errors.cvc && <p className="mt-1 text-xs text-red-500">
                              {errors.cvc}
                            </p>}
                        </div>
                      </div>
                    </motion.form> : <motion.div key="paypal-form" initial={{
                  opacity: 0,
                  height: 0
                }} animate={{
                  opacity: 1,
                  height: 'auto'
                }} exit={{
                  opacity: 0,
                  height: 0
                }} transition={{
                  duration: 0.3
                }} className="bg-blue-50 border border-blue-100 rounded-lg p-4 overflow-hidden">
                      <p className="text-sm text-gray-700 mb-3">
                        Vous allez être redirigé vers PayPal pour finaliser
                        votre paiement en toute sécurité.
                      </p>
                      <div className="flex justify-center">
                        <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal" className="h-10" />
                      </div>
                    </motion.div>}
                </AnimatePresence>
              </div>
            </div>
            {selectedPlan !== 'onetime' && <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h3 className="font-medium text-gray-900 mb-4">
                  Période de facturation
                </h3>
                <div className="flex space-x-3 mb-3">
                  <button className={`flex-1 py-2 px-3 rounded-lg border ${billingPeriod === 'monthly' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'} transition-colors flex items-center justify-center`} onClick={() => setBillingPeriod('monthly')}>
                    <span className="text-sm font-medium text-gray-800">
                      Mensuel
                    </span>
                    {billingPeriod === 'monthly' && <CheckIcon className="w-4 h-4 text-blue-500 ml-2" />}
                  </button>
                  <button className={`flex-1 py-2 px-3 rounded-lg border ${billingPeriod === 'yearly' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'} transition-colors flex items-center justify-center relative`} onClick={() => setBillingPeriod('yearly')}>
                    <span className="text-sm font-medium text-gray-800">
                      Annuel
                    </span>
                    {billingPeriod === 'yearly' && <CheckIcon className="w-4 h-4 text-blue-500 ml-2" />}
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      -20%
                    </div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  {billingPeriod === 'yearly' ? `Économisez 20% avec l'abonnement annuel (facturé ${yearlyPrice.toFixed(0)}€/an)` : 'Facturé mensuellement, annulable à tout moment'}
                </p>
              </div>}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Code promo</h3>
                {!showCouponField && <button className="text-sm text-blue-600 hover:text-blue-800" onClick={() => setShowCouponField(true)}>
                    Ajouter
                  </button>}
              </div>
              <AnimatePresence>
                {showCouponField && <motion.div initial={{
                height: 0,
                opacity: 0
              }} animate={{
                height: 'auto',
                opacity: 1
              }} exit={{
                height: 0,
                opacity: 0
              }} transition={{
                duration: 0.3
              }} className="overflow-hidden">
                    <div className="flex space-x-2">
                      <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Entrez votre code" value={couponCode} onChange={e => setCouponCode(e.target.value)} disabled={couponApplied} />
                      <Button variant="secondary" onClick={applyCoupon} disabled={!couponCode || couponApplied}>
                        Appliquer
                      </Button>
                    </div>
                    {couponApplied && <div className="mt-2 text-sm text-green-600 flex items-center">
                        <CheckIcon className="w-4 h-4 mr-1" />
                        Code promo appliqué : -15%
                      </div>}
                  </motion.div>}
              </AnimatePresence>
            </div>
          </div>
          {/* Order summary - 2 columns */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-5">
              <h3 className="font-medium text-gray-900 mb-4">
                Récapitulatif de commande
              </h3>
              <div className="border-t border-gray-100 pt-4 mb-4">
                <div className="flex items-start mb-4">
                  <div className={`w-10 h-10 rounded-full ${styles.bgAccent} bg-opacity-10 flex items-center justify-center mr-3 flex-shrink-0`}>
                    <CreditCardIcon className={`w-5 h-5 ${styles.accentColor}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {plan.name}
                      {selectedPlan !== 'onetime' && <span className="font-normal text-gray-500 ml-1">
                          {billingPeriod === 'yearly' ? '(Annuel)' : '(Mensuel)'}
                        </span>}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {selectedPlan === 'onetime' ? 'Paiement unique' : billingPeriod === 'yearly' ? 'Facturé annuellement' : 'Facturé mensuellement'}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => <div key={index} className="flex items-start">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>)}
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Prix</span>
                    <span className="text-sm text-gray-900">
                      {plan.price}
                      {plan.billingPeriod}
                    </span>
                  </div>
                  {billingPeriod === 'yearly' && selectedPlan !== 'onetime' && <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Réduction annuelle
                      </span>
                      <span className="text-sm text-green-600">-20%</span>
                    </div>}
                  {couponApplied && <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Code promo ({couponCode})
                      </span>
                      <span className="text-sm text-green-600">
                        -{(couponDiscount * 100).toFixed(0)}%
                      </span>
                    </div>}
                  <div className="border-t border-gray-100 pt-2 flex justify-between font-medium">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">
                      {finalPrice.toFixed(2).replace('.', ',')}€
                      {selectedPlan !== 'onetime' && <span className="text-sm text-gray-500 ml-1">
                          {billingPeriod === 'yearly' ? '/mois' : '/mois'}
                        </span>}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant={styles.buttonVariant} className="w-full flex items-center justify-center" onClick={handleSubmit} disabled={isProcessing}>
                {isProcessing ? <>
                    <motion.div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" animate={{
                  rotate: 360
                }} transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear'
                }} />
                    Traitement en cours...
                  </> : <>
                    Payer {finalPrice.toFixed(2).replace('.', ',')}€
                    {selectedPlan !== 'onetime' && billingPeriod === 'monthly' && ' /mois'}
                    <ChevronRightIcon className="w-5 h-5 ml-1" />
                  </>}
              </Button>
              <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
                <ShieldIcon className="w-3 h-3 mr-1" />
                <span>Paiement 100% sécurisé</span>
              </div>
              <div className="mt-3 text-xs text-center text-gray-500">
                {selectedPlan !== 'onetime' ? <>
                    En confirmant, vous acceptez les{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      CGV
                    </a>{' '}
                    et autorisez Apply à débiter votre compte{' '}
                    {billingPeriod === 'yearly' ? 'annuellement' : 'mensuellement'}
                    . Annulable à tout moment.
                  </> : <>
                    En confirmant, vous acceptez les{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      CGV
                    </a>
                    . Ce paiement unique vous donne accès pendant 1 mois sans
                    renouvellement automatique.
                  </>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>;
};