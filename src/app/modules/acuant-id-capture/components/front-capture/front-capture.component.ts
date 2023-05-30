import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators'
import { AcuantCredentials, IAcuantConfiguration, AcuantResult, ResponseError, ErrorCode } from '@fad-producto/ng-fad-acuant';
import { PROCESS_TYPE } from 'src/app/utils/acuant-process';

@Component({
  selector: 'app-front-capture',
  templateUrl: './front-capture.component.html',
  styleUrls: ['./front-capture.component.css']
})
export class FrontCaptureComponent implements OnInit {

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
          primary: "#A70635"
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
              initializing: "inicializando",
              processing: "procesando"
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
              instruction: "Sube el frente de tu identificación",
              title: "Frente"
            }
          }
        },
        
      },
    },
    pathDependencies: {
      /*images: { // Specify path image to be shown on each device and step, if you wan to use the default, remove the property
        instructionFrontManualCaptureMobile: "assets/customImages/fad-acuant/id-back.svg",
        instructionBackManualCaptureMobile: "assets/customImages/fad-acuant/id-front.svg",
        instructionFrontManualCaptureDesktop: "assets/customImages/fad-acuant/id-front-desktop.svg",
        instructionBackManualCaptureDesktop: "assets/customImages/fad-acuant/id-back-desktop.svg"
      }*/
    }
  }

  isProcessComplete: boolean = false; //Use to hide the module once the process is complete
  ocrRequired: boolean = true;
  idPhotoRequired: boolean = true //If idPhoto is required then ocrRequired must be true
  acuantResult: AcuantResult;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    //Check isRelated param to save documentInstance
    this.route.params.pipe(take(1)).subscribe((params: any) => {
      const relate = params['isRelated']
      PROCESS_TYPE.relate = relate == "relate"
      if(PROCESS_TYPE.relate){
        this.ocrRequired = false;
        this.idPhotoRequired = false;
      }
    })
  }


  oncomplete(result: AcuantResult) {
    console.log(result) //Do something with the result
    this.acuantResult = result;
    if(PROCESS_TYPE.relate){
      sessionStorage.setItem("documentInstance", result.documentInstance)
      sessionStorage.setItem("front", result.id.image.data)
      this.router.navigate(["/acuant-capture/back-capture"])
    }
    
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
        alert("Ocurrió un error al obtener la url de la imagen del rosto de la identificación, verifica que idData sea true")
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


