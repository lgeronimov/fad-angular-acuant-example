import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials, ErrorCodeSession, ErrorCodeStatus, IFacetecConfiguration, ResponseError, ResponseSuccess } from '@fad-producto/ng-fad-facetec';

@Component({
  selector: 'app-prueba-de-vida',
  templateUrl: './prueba-de-vida.component.html',
  styleUrls: ['./prueba-de-vida.component.css']
})
export class PruebaDeVidaComponent implements OnInit {

  readonly credentials: Credentials = {
    deviceKeyIdentifier: 'dAaa7DjCJH7f4zuLwJFFlSjgAXL6k8q2',
    baseURL: 'https://facetec-preprod.firmaautografa.com',
    publicFaceScanEncryptionKey: '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5PxZ3DLj+zP6T6HFgzzk\n' +
    'M77LdzP3fojBoLasw7EfzvLMnJNUlyRb5m8e5QyyJxI+wRjsALHvFgLzGwxM8ehz\n' +
    'DqqBZed+f4w33GgQXFZOS4AOvyPbALgCYoLehigLAbbCNTkeY5RDcmmSI/sbp+s6\n' +
    'mAiAKKvCdIqe17bltZ/rfEoL3gPKEfLXeN549LTj3XBp0hvG4loQ6eC1E1tRzSkf\n' +
    'GJD4GIVvR+j12gXAaftj3ahfYxioBH7F7HQxzmWkwDyn3bqU54eaiB7f0ftsPpWM\n' +
    'ceUaqkL2DZUvgN0efEJjnWy5y1/Gkq5GGWCROI9XG/SwXJ30BbVUehTbVcD70+ZF\n' +
    '8QIDAQAB\n' +
    '-----END PUBLIC KEY-----',
    productionKeyText: {
      domains: '',
      expiryDate: '2023-06-10',
      key: '00304602210084ff3bf9597db58c0ed49b692fbd02c6460647e4c4cfca85f0be4ed0150c70e8022100ff44295553aa02db0fc7d146fe6130b9bc8bdcdb05df3c9ae35a32136b18000d'
    }
  };

  configuration: IFacetecConfiguration = { 
    customization: {
      fadCustomization: {
        colors: {
          primary: "#A70635",
          secondary: "#A70635",
          tertiary: "#363636"
        },
        buttons: {
          primary: {
            backgroundColor: "#A70635",
            labelColor: "#FFFFFF",
            borderColor: "#A70635",
            borderStyle: "solid",
            borderWidth: "1px"
          },
          common: {
            backgroundColorDisabled: "#DCDCDC",
            labelColorDisabled: "#8E8E8E"
          },
        },
        fonts: {
          title: {
            fontFamily: "system-ui",
            fontSize: "25px"
          },
          subtitle: {
            fontFamily: "system-ui",
            fontSize: "17px"
          },
          content: {
            fontFamily: "system-ui",
            fontSize: "15px"
          },
          informative: {
            fontFamily: "system-ui",
            fontSize: "12px"
          },
          button: {
            fontFamily: "system-ui",
            fontSize: "17px"
          }
        }
      },
      moduleCustomization: {
        style: {
          common: {
            loader: {
              backgroundColor: "#000000",
              labelColor: "#FFFFFF",
              animationColor: "#2E16F9"
            }
          }
        },
        legends: {
          common: {
            loader: {
              initializing: "Cargando el modulo",
              processing: "Espera mientras procesamos la captura"
            },
          },
          facetec: {
            accessibilityCancelButton: "Cancel button",
            feedbackCenterFace: "Centra tu rostro",
            feedbackFaceNotFound: "Enfoca tu rostro",
            feedbackMoveAwayWeb: "Aléjate un poco",
            feedbackMoveWebCloser: "Acércate un poco",
            feedbackMovePhoneAway: "Aleja tu celular",
            feedbackMovePhoneCloser: "Acerca tu celular",
            feedbackMovePhoneToEyeLevel: "Mueve tu celular a la altura de tus ojos",
            feedbackMoveToEyeLevelWeb: "Muévete a la altura de tus ojos",
            feedbackFaceNotLookingStraightAhead: "Tu rostro no esta mirando de frente",
            feedbackFaceNotUpright: "Pon tu rostro recto",
            feedbackFaceNotUprightMobile: "Pon tu rostro recto",
            feedbackUseEvenLighting: "Usa una luz que ilumine todo tu rostro",
            feedbackHoldSteady: "Mantente quieto",
            feedbackMoveWebEvenCloser: "Acércate más",
            instructionsHeaderReadyDesktop: "Biometría facial",
            instructionsMessageReadyDesktop: "Enfoca tu rostro en la guía y da clic en el botón para continuar",
            instructionsHeaderReadyMobile1: "Biometría facial",
            instructionsHeaderReadyMobile2: "",
            instructionsMessageReadyMobile1: "Enfoca tu rostro en la guía y",
            instructionsMessageReadyMobile2: "da clic en el botón para continuar",
            instructionsHeaderReady: "Biometría facial",
            instructionsMessageReady: "Enfoca tu rostro en la guía y da clic en el botón para continuar",
            actionImReady: "Continuar",
            resultFacescanUploadMessage: "procesando",
            retryHeader: "Inténtalo nuevamente",
            retrySubheaderMessage: "Necesitamos una imagen mas clara",
            retryYourImageLabel: "Tu foto",
            retryIdealImageLabel: "Pose ideal",
            retryInstructionMessage1: "Som brillo o iluminación extrema",
            retryInstructionMessage2: "Expresión neutral, sin sonreír",
            retryInstructionMessage3: "Demasiado borroso, limpia tu cámara",
            presessionFrameYourFace: "Enfoca tu rostro en la guía",
            presessionLookStraightAhead: "Mira al frente",
            presessionHoldSteady3: "No te muevas por: 3",
            presessionHoldSteady2: "No te muevas por: 2",
            presessionHoldSteady1: "No te muevas por: 1",
            presessionEyesStraightAhead: "Mira al frente",
            presessionRemoveDarkGlasses: "Quítate los lentes de sol",
            presessionNeutralExpression: "Expresión neutral, sin sonreír",
            presessionConditionsTooBright: "Entorno com demasiada luz",
            presessionBrightenYourEnvironment: "Entorno con poca luz",
            actionTryAgain: "Aceptar",
            actionOk: "Ok",
            cameraPermissionHeader: "Permiso de cámara o micrófono desactivado",
            cameraPermissionMessage: "Por favor revisa la configuración de tu sistema operativo y los ajustes del navegador.",
            cameraPermissionLaunchSettings: "Aceptar",
            cameraActionOk: "Ok",
            initializingCamera: "iniciando",
            initializingCameraStillLoading: "iniciando...",
            resultSuccessMessage: "Validación correcta",
            enterFullscreenHeader: "Prueba de vida",
            enterFullscreenMessage: "Antes de comenzar da clic en el botón de abajo para abrir en pantalla completa",
            enterFullscreenAction: "Continuar",
          }
        }
      }
    },
    pathDependencies: {
      images: {
        // retryScreenSlideshowImage: 'Custom image URL'
      }
    }
  }

  isProcessComplete: boolean = false; //Use to hide the module when the process is complete
  facetecResponse: ResponseSuccess

  oncomplete(response: ResponseSuccess ) {
    //Do what you need with the result
    console.log(response); // all result from facetec
    this.facetecResponse = response
    this.isProcessComplete = true
  }

  onerror(error: ResponseError) {
    console.error(error);
    switch(error.code){
      case ErrorCodeSession.NEVER_INITIALIZED: 
      case ErrorCodeStatus.NEVERIN_ITIALIZED:
        alert("No se intento inicializar")
        this.router.navigate(['home'])
        break;

      case ErrorCodeSession.MISSING_GUIDANCE_IMAGES:
        alert("No se configuraron todas las imágenes de guía")
        this.router.navigate(['home'])
        break;

      case ErrorCodeSession.TIMEOUT:
        alert("Timeout, se termino el tiempo para completar el proceso")
        this.router.navigate(['prueba-de-vida'])
        break;

      case ErrorCodeSession.CONTEXT_SWITCH:
        alert("La sesión se canceló debido a que la aplicación se colocó en segundo plano, intenta nuevamente")
        this.router.navigate(['prueba-de-vida'])
        break;

      case ErrorCodeSession.PROGRAMMATICALLY_CANCELLED:
        alert("The developer programmatically called the Session cancel API")
        this.router.navigate(['home'])
        break;

      case ErrorCodeSession.ORIENTATION_CHANGE_DURING_SESSION:
        alert("Se cancelo la sesión porque se cambio la orientación del dispositivo, inténtalo nuevamente")
        this.router.navigate(['prueba-de-vida'])
        break;

      case ErrorCodeSession.LANDSCAPE_MODE_NOT_ALLOWED:
      case ErrorCodeStatus.DEVICE_IN_LANDSCAPE_MODE:
        alert("Se cancelo la sesión porque el dispositivo esta en modo landscape")
        this.router.navigate(['prueba-de-vida'])
        break;

      case ErrorCodeSession.USER_CANCELLED:
      case ErrorCodeSession.USER_CANCELLED_FROM_NEW_USER_GUIDANCE:
      case ErrorCodeSession.USER_CANCELLED_FROM_RETRY_GUIDANCE:
      case ErrorCodeSession.USER_CANCELLED_WHEN_ATTEMPTING_TO_GET_CAMERA_PERMISSIONS:
      case ErrorCodeSession.LOCKED_OUT:
        alert("El usuario cancelo el proceso y no completo la sesión")
        this.router.navigate(['prueba-de-vida'])
        break;

      case ErrorCodeSession.CAMERA_NOT_ENABLED:
        alert("Se cancelo la sesión porque la cámara no esta habilitada")
        this.router.navigate(['home'])
        break;

      case ErrorCodeSession.DOCUMENT_NOT_READY:
        alert(`Se cancelo la sesión, ${error.error}`)
        this.router.navigate(['home'])
        break;

      case ErrorCodeSession.SESSION_IN_PROGRESS:
        alert("Se cancelo la sesión porque había otra sesión en progreso")
        this.router.navigate(['home'])
        break;

      case ErrorCodeSession.INITIALIZATION_NOT_COMPLETED:
        alert("Se cancelo la sesión porque no se completo la inicializacion")
        this.router.navigate(['home'])
        break;

      case ErrorCodeSession.UNKNOWN_INTERNAL_ERROR:
        alert("Ocurrió un error inesperado, inténtalo de nuevo")
        this.router.navigate(['prueba-de-vida'])
        break;

      case ErrorCodeSession.STILL_LOADING_RESOURCES:
      case ErrorCodeSession.RESOURCES_COULD_NOT_BE_LOADED_ON_LAST_INIT:
      case ErrorCodeSession.RESOURCES_COULD_NOT_BE_LOADED:
      case ErrorCodeStatus.STILL_LOADING_RESOURCES:
      case ErrorCodeStatus.RESOURCES_COULD_NOT_BE_LOADED_ON_LAST_INIT:
        alert("Ocurrió un problema con los recursos de Facetek")
        this.router.navigate(['prueba-de-vida'])
        break;

      case ErrorCodeSession.REQUIRED_CREDENTIALS:
        alert("No se proporcionaron las credenciales para el modulo")
        this.router.navigate(['home'])
        break;

      case ErrorCodeSession.REQUIRED_MIDDLEWARE_INFO:
        alert("No se proporciono la información del middleware")
        this.router.navigate(['home'])
        break;

      case ErrorCodeSession.MAX_ATTEMPTS:
        alert("El usuario excedió el numero máximo de intentos")
        this.router.navigate(['home'])
        break;

      case ErrorCodeStatus.INVALID_DEVICE_KEY_IDENTIFIER:
        alert("Device key identifier que se proporciono no es valido");
        this.router.navigate(['home'])
        break;
        
      case ErrorCodeStatus.VERSION_DEPRECATED:
        alert("La version esta depreciada");
        this.router.navigate(['home'])
        break;

      case ErrorCodeStatus.DEVICE_NOT_SUPPORTED:
        alert("El dispositivo, plataforma, navegador o version no es soportada/o");
        this.router.navigate(['home'])
        break;

      case ErrorCodeStatus.KEY_EXPIRED_OR_INVALID:
        alert("La llave que se proporciono no es valida, expiro o el dominio no esta en la llave.");
        this.router.navigate(['home'])
        break;
        
      default:
        this.router.navigate(['home'])
        break;  
    }
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
