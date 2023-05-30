import { Component, OnInit } from '@angular/core';
import { IVideoagreementConfiguration, ResponseError, ResponseSuccess } from '@fad-producto/ng-fad-videoagreement';

@Component({
  selector: 'app-videoagreetment',
  templateUrl: './videoagreetment.component.html',
  styleUrls: ['./videoagreetment.component.css']
})
export class VideoagreetmentComponent implements OnInit {

  public legend = 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto  de relleno estándar de las industrias desde el año 1500';

  configuration: IVideoagreementConfiguration = {
    //Probar y despues quitar faceDetection
    faceDetection: {
      faceRequired: true //Si es false ignora faceUndetected de timer
    },
    selfie: {
      captureSelfie: false,
      imageType: 'image/png',
      imageQuality: 1
    },
    timer: {
      recording: { min: 5 , max: 10 },
      faceUndetected: 3
    },
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
              animationColor: "#FFFFFF"
            }
          }
        },
        legends: {
          common: {
            loader: {
              initializing: "inicializando",
              processing: "procesando"
            },
          },
          buttonRecord: "Grabar",
          buttonFinish: "Terminar",
          acceptancetInstruction: "Aceptar",
          recording: "grabando",
          focusFace: "Enfoca tu rostro",
        }
      }
    }
  };

  oncomplete(response: ResponseSuccess) {
    console.log(response);
  }

  onerror(error: ResponseError) {
    console.log(error);
    // if (error.code === ErrorCode.BROWSER_NOT_SUPPORTED) // do something
  }
  
  acceptCamera() {
    console.log('camera accepted');
  }


  constructor() { }

  ngOnInit(): void {
  }

}
