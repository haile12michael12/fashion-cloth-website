import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Header translations
      "home": "Home",
      "upload": "Upload",
      "cart": "Cart",
      "profile": "Profile",
      "logout": "Logout",
      "register": "Register",
      "login": "Login",
      "search": "Search",
      
      // Home page translations
      "welcome": "Welcome to Fashion Cloth Website",
      "featured_products": "Featured Products",
      "view_details": "View Details",
      
      // Auth translations
      "email": "Email",
      "password": "Password",
      "name": "Name",
      "confirm_password": "Confirm Password",
      "already_have_account": "Already have an account?",
      "dont_have_account": "Don't have an account?",
      
      // Common translations
      "save": "Save",
      "cancel": "Cancel",
      "delete": "Delete",
      "edit": "Edit",
      "loading": "Loading...",
      "success": "Success!",
      "error": "Error occurred"
    }
  },
  es: {
    translation: {
      // Header translations
      "home": "Inicio",
      "upload": "Subir",
      "cart": "Carrito",
      "profile": "Perfil",
      "logout": "Cerrar sesión",
      "register": "Registrarse",
      "login": "Iniciar sesión",
      "search": "Buscar",
      
      // Home page translations
      "welcome": "Bienvenido al sitio web de ropa de moda",
      "featured_products": "Productos destacados",
      "view_details": "Ver detalles",
      
      // Auth translations
      "email": "Correo electrónico",
      "password": "Contraseña",
      "name": "Nombre",
      "confirm_password": "Confirmar contraseña",
      "already_have_account": "¿Ya tienes una cuenta?",
      "dont_have_account": "¿No tienes una cuenta?",
      
      // Common translations
      "save": "Guardar",
      "cancel": "Cancelar",
      "delete": "Eliminar",
      "edit": "Editar",
      "loading": "Cargando...",
      "success": "¡Éxito!",
      "error": "Ocurrió un error"
    }
  },
  fr: {
    translation: {
      // Header translations
      "home": "Accueil",
      "upload": "Télécharger",
      "cart": "Panier",
      "profile": "Profil",
      "logout": "Se déconnecter",
      "register": "S'inscrire",
      "login": "Se connecter",
      "search": "Recherche",
      
      // Home page translations
      "welcome": "Bienvenue sur le site de vêtements de mode",
      "featured_products": "Produits populaires",
      "view_details": "Voir les détails",
      
      // Auth translations
      "email": "E-mail",
      "password": "Mot de passe",
      "name": "Nom",
      "confirm_password": "Confirmer le mot de passe",
      "already_have_account": "Vous avez déjà un compte ?",
      "dont_have_account": "Vous n'avez pas de compte ?",
      
      // Common translations
      "save": "Enregistrer",
      "cancel": "Annuler",
      "delete": "Supprimer",
      "edit": "Modifier",
      "loading": "Chargement...",
      "success": "Succès !",
      "error": "Une erreur s'est produite"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;