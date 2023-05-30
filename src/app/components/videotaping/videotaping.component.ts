import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ErrorCode, Identification, IDS_ALLOWED, IVideotapingConfiguration, ResponseError, ResponseSuccess } from '@fad-producto/ng-fad-videotaping';


@Component({
  selector: 'app-videotaping',
  templateUrl: './videotaping.component.html',
  styleUrls: ['./videotaping.component.css']
})
export class VideotapingComponent implements OnInit {

  public legend = 'Yo Nombre del firmante, con fecha de nacimiento 20 de Junio, con credencial de elector número: 1234134134 declaro que soy Soltero, con ingresos mensuales de $15,667.21, cuento con Casa o depto propio actualmente SI cuento con tarjetas de crédito y reconozco que la información que he proporcionado es verídica';

  public identifications: Identification[] = [{ name: IDS_ALLOWED.ID_MEX_FRONT, title: 'Front' }, { name: IDS_ALLOWED.ID_MEX_BACK, title: 'Back' }];

  // optional
  public configuration: IVideotapingConfiguration = {
    idDetection: {
      captureId: true,
      probability: 0.85
    },
    recorder: {
      recordEverything: false
    },
    selfie: {
      captureSelfie: true,
      imageType: 'image/png',
      imageQuality: 1
    },
    selfieId: {
      captureSelfieId: false,
      imageType: 'image/png',
      imageQuality: 1,
      captureTimeout: 100
    },
    customization: {
      fadCustomization: {
        colors: {
          primary: '#A70635',
          secondary: '#A70635',
          tertiary: '#363636',
          succesful: '#5A9A92',
        },
        buttons: {
          primary: {
            backgroundColor: '#A70635',
            labelColor: '#ffffff',
            borderColor: '#A70635',
            borderStyle: 'solid',
            borderWidth: '1px',
           },
           secondary: {
            backgroundColor: '#363636ad',
            labelColor: '#ffffff',
            borderColor: '#ffffff',
           },
           common: {
            backgroundColorDisabled: '#dcdcdc',
            labelColorDisabled: '#8e8e8e',
           }
        },
        fonts: {
          title: {
            fontSize: '25px',
            fontFamily: 'system-ui',
           },
           subtitle: {
            fontSize: '17px',
            fontFamily: 'system-ui',
           },
           content: {
            fontSize: '15px',
            fontFamily: 'system-ui',
           },
           informative: {
            fontSize: '12px',
            fontFamily: 'system-ui',
           },
           button: {
            fontSize: '17px',
            fontFamily: 'system-ui',
           }
        }
      },
      moduleCustomization: {
        legends: {
          videoagreement: {
            buttonRecord: 'Iniciar grabación',
            buttonFinish: 'Terminar',
            acceptancetInstruction: 'Graba el siguiente texto de forma clara y fuerte',
            recording: 'Grabando',
            focusFace: 'Enfoca tu rostro dentro de la guía'
          },
          idDetection: {
            instruction: 'Acerca y aleja tu identificación',
            instructionCustomOne: 'Acerca y aleja el',
            instructionCustomTwo: 'de tu identificación',
           },
           common: {
            loader: {
              initializing: 'iniciando',
              processing: 'procesando',
            }
           }
        },
        style: {
          common: {
            loader: {
              backgroundColor: '',
              animationColor: '',
              labelColor: ''
            }
          }
        }
      }
    }
  };
  
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  isProcessComplete: boolean = false
  videoResult: ResponseSuccess
  videoSrc: any;
  
  ngOnInit(): void {
  }

  oncomplete(response: ResponseSuccess) {
    console.log(response);
    this.videoResult = response
    this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(response.video))
    this.isProcessComplete = true
  }

  onerror(error: ResponseError) {
    console.log(error);
  
    switch(error.code){
      case ErrorCode.BROWSER_NOT_SUPPORTED:
        alert("El navegador no es soportado, inténtalo en uno diferente.")
        this.router.navigate(['home'])
        break;

      case ErrorCode.NOT_ACCEPT_CAMERA_PERMISSION:
        alert("Se bloqueo el permiso a la cámara, permite su uso para poder continuar.")
        this.router.navigate(['home'])
        break;

      case ErrorCode.VIDEO_CREATION_FAIL:
        alert("Ocurrió un problema al crear el video, inténtalo nuevamente.")
        this.router.navigate(['video-taping'])
        break;

      case ErrorCode.MEDIA_RECORDER_ERROR:
        alert("Ocurrió un error con Media Recorder, inténtalo nuevamente")
        this.router.navigate(['video-taping'])
        break;

      case ErrorCode.FACE_UNDETECTED:
        alert("No se detecto el rostro, inténtalo nuevamente")
        this.router.navigate(['video-taping'])
        break;

      case ErrorCode.REQUIRED_LEGEND:
        alert("No se configuro una leyenda para el modulo")
        this.router.navigate(['home'])
        break;

      case ErrorCode.VIDEO_EMPTY:
        alert("Ocurrió un problema con el video, por favor cierra todas las aplicaciones e inténtalo de nuevo")
        this.router.navigate(['video-taping'])
        break;

      case ErrorCode.NOT_READABLE_CAMERA:
        alert("La cámara y/o el micrófono están siendo usados por otra aplicación")
        this.router.navigate(['video-taping'])
        break;

      case ErrorCode.TEACHABLE_MACHINE_LOAD_FAIL:
      case ErrorCode.TENSORFLOW_LOAD_FAIL:
        this.router.navigate(['video-taping'])
        break;

      case ErrorCode.MEDIA_RECORDER_NOT_SUPPORTED:
        alert("El navegador no soporta media recorder, inténtalo en uno diferente.")
        this.router.navigate(['home'])
        break;

      case ErrorCode.IDENTIFICATIONS_REQUIRED:
        alert("No se presento una identificación durante el proceso, inténtalo nuevamente")
        this.router.navigate(['video-taping'])
        break;

      case ErrorCode.NO_AUDIO:
        alert("El video no tiene audio, por favor cierra todas las aplicaciones e inténtalo de nuevo")
        this.router.navigate(['video-taping'])
        break;

      case ErrorCode.CONTEXT_SWITCH:
        alert("El modulo se puso en segundo plano, el proceso no debe ser interrumpido")
        this.router.navigate(['video-taping'])
        break;

      default:
        this.router.navigate(['home'])
        break;
    }
  }
  
  acceptCamera() {
    console.log('camera accepted');
  }

  onclose(){
    console.log('module closed');
  }


}
