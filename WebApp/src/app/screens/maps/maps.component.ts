import { MapsAPILoader, AgmMap } from '@agm/core';
import { ChangeDetectorRef, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { get } from 'scriptjs';
import { Shop } from 'src/app/model/shop.model';
import { ShopDetailsMessageComponent } from '../shop-details-message/shop-details-message.component';
import { MemberService } from 'src/app/services/member.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HomenavControlService } from 'src/app/services/homenav-control.service';
declare var klokantech: { GeolocationControl: new (arg0: any, arg1: number) => any; };

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, OnDestroy {
  shopsVatData: Shop[] = [];
  selectedShop: Shop;
  latitude: any;
  longitude: any;
  @ViewChild('search')
  addressForm = new FormControl();

  private geoCoder;
  zoom: number;
  address: string;
  isNoDelivery: boolean;
  cityVM = {
    city: null,
    address: null,
    email: null,
    lat: null,
    long: null,
    name: null
  };

  selectedCityAddress: string = null;
  public searchElementRef: ElementRef;
  newLong: any;
  newLat: any;
  public agmMap: AgmMap

  constructor(public user:HomenavControlService,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public dialog: MatDialog, private memberService: MemberService, private cd: ChangeDetectorRef) {
  }
  ngOnDestroy(): void {
    this.user.isMapComponent = false;
  }

  myControl = new FormControl();
  filteredOptions: Observable<Shop[]>;

  async ngOnInit() {
    this.user.isMapComponent = true;
    try {
      await this.memberService.getShopsVatDetails().subscribe((data: any) => {
        this.shopsVatData = [];
        data.result.responseData.forEach(element => {
          if(element.name){
            element.fullAddress = element.name;
          }
          if(element.address){
            element.fullAddress = `${element.fullAddress}, ${element.address}`;
          }
          if(element.city){
            element.fullAddress = `${element.fullAddress}, ${element.city}`;
          }
          this.shopsVatData.push(element);
        });
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this.arrayFilter(value))
        );
      });
    } catch (error) {
      console.error(error);
    }
    this.loadMap();

    this.user.isShowIconHomeBold= false;
    this.user.isShowIconPurBold = false;
    this.user.isShowIconShopBold = true;
    this.user.isShowIconProBold = false;
  };

  arrayFilter(value: string): Shop[] {
    const filterValue = value.toLowerCase();
    return this.shopsVatData.filter(function (option) {
      if (option.fullAddress) {
        return option.fullAddress.toLowerCase().includes(filterValue);
      }
    });
  }

  loadMap() { 
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      this.getCurrentLocation();
    });
  };

  // Get Current Location Coordinates
  getCurrentLocation() { 
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  };

  markerDragEnd($event: any) { 
    window.alert("Marker Drag End Called");
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  country: any;
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') { 
        if (results[0]) {
          this.zoom = 12;

          let city;
          let state;
          this.address = results[0].formatted_address;
          let component = results[0].address_components;

          if (component != undefined) { 
            for (var i = 0; i < component.length; i++) {
              if (component[i].types[0] == "locality") {
                city = component[i];
              }
              if (component[i].types[0] == "administrative_area_level_1") {
                state = component[i];
              }
              if (component[i].types[0] == "country") {
                this.country = component[i];
              }
            }
          }

          if (this.country.short_name === "US") {
            this.isNoDelivery = true;
          }
          else {
            this.isNoDelivery = false;
          }

          this.cityVM.city = city;
          this.cityVM.lat = latitude.toString();
          this.cityVM.long = longitude.toString();
          this.cityVM.address = this.address;
          this.selectedCityAddress = this.cityVM.address;

          sessionStorage.setItem('selectedCityAddress', this.selectedCityAddress);
          sessionStorage.setItem('userLatitude', this.cityVM.lat);
          sessionStorage.setItem('userLongtitude', this.cityVM.long);
          sessionStorage.setItem('selectedCity', this.cityVM.city);
        }
        else {
          window.console.error('No results found');
          this.cityVM = {
            city: null,
            address: null,
            email: null,
            lat: null,
            long: null,
            name: null
          };
          this.selectedCityAddress = null;
          sessionStorage.removeItem('selectedCityAddress');
          sessionStorage.removeItem('userLatitude');
          sessionStorage.removeItem('userLongtitude');
        }
      } else { 
        window.console.error('Geocoder failed due to: ' + status);
        this.cityVM = {
          city: null,
          address: null,
          email: null,
          lat: null,
          long: null,
          name: null
        };
        this.selectedCityAddress = null;
        sessionStorage.removeItem('selectedCityAddress');
        sessionStorage.removeItem('userLatitude');
        sessionStorage.removeItem('userLongtitude');
      }
    });
  }

  async getCoordinatesByAddress(address) { 
    await this.geoCoder.geocode({ 'address': address }, (results, status) => {
      if (status === 'OK') {
        const { geometry } = results[0];
        const lat = geometry.location.lat().toString();
        const lng = geometry.location.lng().toString();
        return { lat, lng };
      } else {
        alert("Not Found");
        return {};
      }
    });
  }

  openPopUpDetailsShop(selectedShop: any) { 
    const dialogRef = this.dialog.open(ShopDetailsMessageComponent, {
      width: '450px',
      data: { 
        name: selectedShop.name,
        address: selectedShop.address,
        city: selectedShop.city,
        country: selectedShop.country,
        Phone: selectedShop.phone
      }
    });

    dialogRef.afterClosed().subscribe(async result => { 
      const { action, name, addres, city, country } = result;
      if (action && action === 'ShowOnMap') {
        this.geoCoder.geocode({ 'address': `${addres},${city},${country}` }, (results, status) => {
          if (status === 'OK') {
            const { geometry } = results[0];
            this.latitude = parseFloat(geometry.location.lat());
            this.longitude = parseFloat(geometry.location.lng());
            this.zoom = 14;
            this.cd.detectChanges();
          } else {
            alert("Not Found");
          }
        });
      }
    });
  }
}

