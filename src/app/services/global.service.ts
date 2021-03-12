import { Injectable, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Subscription, Subject, interval } from 'rxjs';
import { Article } from '../models/article.model';

export interface Item {
  id: number,
  title: string,
  value: any,
  modified: number
}
 
export interface SavedData {
  userId:string;
  username:string;
  password:string;
  savedArticles: Article[];
} 

@Injectable()
export class GlobalService{
  
  public position = {
    latitude: 0,
    longitude: 0
  };
  
  public mdpCount = 1;

  public savedData: SavedData = {
    userId:"",
    username:"",
    password: "",
    savedArticles: []
    
  }

  networkStatus : boolean = true;
  
  disconnectSubscription : Subscription;
  connectSubscription : Subscription;

  timerSubscription : Subscription;
  timerNeeded = -1;


  savedArticlesId: string[] = [];

  constructor(
                public network: Network) {

                  console.log(this.network.type);
      if(
        (this.network.type == network.Connection.NONE) ||
        (this.network.type == network.Connection.UNKNOWN)
      ){
        console.log("No network");
        this.networkStatus = false;
      }
    
  this.disconnectSubscription = network.onDisconnect().subscribe(() => {
    console.log("OFF network");
    this.networkStatus = false;
  });

  this.connectSubscription = network.onConnect().subscribe(() => {
    console.log("ON network");
    this.networkStatus = true;
  });
  }
}