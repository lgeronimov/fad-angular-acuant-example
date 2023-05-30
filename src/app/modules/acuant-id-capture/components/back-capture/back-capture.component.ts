import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AcuantCredentials, IAcuantConfiguration, AcuantResult, ResponseError, ErrorCode } from '@fad-producto/ng-fad-acuant';
import { take } from 'rxjs/operators';
import { PROCESS_TYPE } from 'src/app/utils/acuant-process';

@Component({
  selector: 'app-back-capture',
  templateUrl: './back-capture.component.html',
  styleUrls: ['./back-capture.component.css']
})
export class BackCaptureComponent implements OnInit {

  readonly credentials : AcuantCredentials  = { //Your credentials goes here
    passiveUsername: 'acuantEUUser@naat.com',
    passivePassword: 'Q^59zWJzZ^jZrw^q',
    passiveSubscriptionId: ' c681321c-2728-4e8a-a3df-a85ba8a11748',
    acasEndpoint: 'https://eu.acas.acuant.net',
    livenessEndpoint: 'https://eu.passlive.acuant.net',
    assureidEndpoint: 'https://eu.assureid.acuant.net'
  };
  
  public configuration: IAcuantConfiguration = { //This are the available configurations, all of them are optional
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
              //backgroundColor: "#900C3F",                                         //Background color of the loader page
              //animationColor: "#0BF600",
              //labelColor: "#FFFFFF"
            }
          },
        },
        legends: {
          common: {
            loader: {
              initializing: "Iniciando el modulo",
              processing: "Espera mientras procesamos tu identificación"
            }
          },
          scan: {
            none: 'ENFOCA TU ID SOBRE LA GUÍA',
            bigDocument: "ALÉJATE UN POCO",
            smallDocument: 'ACÉRCATE MÁS',
            goodDocument: null,
            capturing: 'CAPTURANDO',
            tapToCapture: 'TOCA LA PANTALLA PARA CAPTURAR'
          },
          manualCapture: {
            tooltip: "Captura nuevamente",
            mobile: {
              instruction: "Captura manualmente tu identificación",
              buttonNext: "Continuar"
            },
            desktop: {
              instruction: "Sube la parte trasera de tu identificación",
              title: "Trasera"
            }
          }
        },
        
      },
    },
    pathDependencies: {
      /*images: {                                                                                               // Specify image to be shown on each device and step
        instructionFrontManualCaptureMobile: "assets/customImages/fad-acuant/id-back.svg",
        instructionBackManualCaptureMobile: "assets/customImages/fad-acuant/id-front.svg",
        instructionFrontManualCaptureDesktop: "assets/customImages/fad-acuant/id-front-desktop.svg",
        instructionBackManualCaptureDesktop: "assets/customImages/fad-acuant/id-back-desktop.svg"
      }*/
    }
  }

  isProcessComplete: boolean = false; //Use to hide the module once the process is complete
  isRelated: boolean = false; //Use to know if the user wants to capture both sides of the ID
  ocrRequired: boolean = true;
  idPhotoRequired: boolean = false //False unless user wants to capture both sides and wants to show idPhoto
  acuantResult: AcuantResult;
  document: string = null
  frontImage: string = null

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(PROCESS_TYPE.relate){
      this.document = sessionStorage.getItem("documentInstance")
      this.frontImage = sessionStorage.getItem("front")
      this.idPhotoRequired = true
    }
  }


  oncomplete(result: AcuantResult) {
    console.log(result) //Do something with the result
    this.acuantResult = result;    
    this.isProcessComplete = true;
  }

  onerror(error: ResponseError) {
    console.error(error);
    // Do something when each error occurs
    switch(error.code){

      case ErrorCode.REQUIRED_CREDENTIALS:
        alert("Faltan las credenciales")
        this.router.navigate(['home']);
        break;
        
      case ErrorCode.FAIL_INITIALIZATION:
        alert("Ocurrió un error al inicializar el modulo, inténtalo nuevamente")
        this.router.navigate(['acuant-capture']);
        break;

      case ErrorCode.UNSUPPORTED_CAMERA:
        alert("La camara de tu dispositivo no es soportada, por favor intenta hacerlo en otro dispositivo o navegador.")
        this.router.navigate(['acuant-capture']);
        break;
      
      case ErrorCode.FAIL_INITIALIZATION_CAMERA_UI:
        alert("Acceso a la cámara no permitido, sigue los pasos para permitir el uso de la cámara de tu dispositivo.")
        this.router.navigate(['acuant-capture']);
        break;

        
      case ErrorCode.FACE_IMAGE_URL_NOT_FOUND:
        alert("Ocurrió un error al obtener la url de la imagen del rosto de la identificación, se esta capturando el anverso de la identificación")
      this.router.navigate(['acuant-capture']);
      break;

      case ErrorCode.RESOURCES_COULD_NOT_BE_LOADED:
      case ErrorCode.UNEXPECTED_ACUANT_ERROR:
        this.router.navigate(['acuant-capture']);
        break;
          
      case ErrorCode.UNSUPPORTED_IMAGE:
        alert("El tipo de imagen no es soportado, intenta subiendo otra imagen con otro formato.")
        this.router.navigate(['acuant-capture']);
        break;
      
      case ErrorCode.FAIL_CREATION_INSTANCE_DOCUMENT:
      case ErrorCode.FAIL_UPLOAD_IMAGE:
      case ErrorCode.FAIL_GET_OCR:
      case ErrorCode.FAIL_GET_FACE_IMAGE:
      case ErrorCode.FACE_IMAGE_NOT_FOUND:
      case ErrorCode.IMAGE_BLURRY:
      default:
        console.log(error.error)
        alert("Ocurrió un error con la captura de la identificación, inténtalo nuevamente")
        this.router.navigate(['acuant-capture']);
        break;
        
    }
  }

}
