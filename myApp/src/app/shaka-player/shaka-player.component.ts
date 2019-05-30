import { UriExchangeService } from './../uri-exchange.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shaka-player',
  templateUrl: './shaka-player.component.html',
  styleUrls: ['./shaka-player.component.css']
})
export class ShakaPlayerComponent implements OnInit {
  shaka = require('../../../node_modules/shaka-player/dist/shaka-player.compiled.js');


  constructor(private uri: UriExchangeService) { }

  ngOnInit() {
    this.initApp();
  }
  initApp() {
    // Install built-in polyfills to patch browser incompatibilities.
    this.shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (this.shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
  }

  initPlayer() {
  // Create a Player instance.
  const video = document.getElementById('video');
  const player = new this.shaka.Player(video);

// Attach player to the window to make it easy to access in the JS console.

// window.player = player;

// Listen for error events.
  player.addEventListener('error', this.onErrorEvent);

// Try to load a manifest.
// This is an asynchronous process.
  player.load(this.uri.manifestUri).then(function () {
  // This runs if the asynchronous load is successful.

  //triggering a modal to display Video
  document.getElementById("openModalButton").click();

  console.log('The video has now been loaded!');
}).catch(error => {this.onError(error)});  // onError is executed if the asynchronous load fails.
}

onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  this.onError(event.detail);
}

onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}



}

