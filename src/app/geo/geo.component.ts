import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { GlobalService } from '../services/global.service';
import { ArticlesService } from '../services/articles.service';
declare var google;

@Component({
  selector: 'app-geo',
  templateUrl: 'geo.component.html',
  styleUrls: ['geo.component.scss']
})
export class GeoComponent implements OnInit, AfterViewInit {
  latitude: any;
  longitude: any;
  map: any;
  marker:any;

  @ViewChild('mapElement') mapNativeElement: ElementRef;
  constructor(private geolocation: Geolocation, private globalService: GlobalService, private articlesService: ArticlesService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 16,
        disableDefaultUI: true
      });
      /*location object*/
      const pos = {
        lat: this.latitude,
        lng: this.longitude
      };
      this.map.setCenter(pos);
      this.initMarker(this.map,pos);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  initMarker(map:any, pos:any){
      const icon = {
        url: 'assets/icon/u3.png', // image url
        scaledSize: new google.maps.Size(50, 75), // scaled size
      };
      this.marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: icon
      });
      this.openInfoWindow();
      this.savePos();
    }
    
    moveMarker(pos:any){
      this.marker.setPosition( new google.maps.LatLng( pos.lat(), pos.lng() ) );
      this.openInfoWindow();
    }

    openInfoWindow(){
      const contentString = '<div id="content">' +
        'Je suis ici !'+
        '</div>';
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 400
        });
        infowindow.open(this.map, this.marker);
    }
    savePos(){
      this.globalService.position.latitude = this.latitude;
      this.globalService.position.longitude = this.longitude;
      
      console.log('latitude: ', this.globalService.position.latitude);
      console.log('longitude: ', this.globalService.position.longitude);
    }

    enterPos(){
      console.log("located");
      let currentCenter = this.map.getCenter();
      this.latitude = currentCenter.lat();
      this.longitude = currentCenter.lng();

      this.savePos();
      this.moveMarker(currentCenter);
      this.articlesService.calculateDistance();
    }
}