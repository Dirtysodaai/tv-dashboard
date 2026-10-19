// Runs in the background inside TizenBrew. When the TV wakes from standby,
// timers jump ahead; that's our cue to bring TizenBrew (and this launcher) to the front.
// ES5 on purpose: some TVs ship an old Node.
var TIZENBREW = 'xvvl3S1bvH.TizenBrewStandalone';
var last = Date.now();

setInterval(function () {
  var now = Date.now();
  if (now - last > 30000) {
    tizen.application.launch(TIZENBREW, null, function () {
      // Fallback: the TV's own control API.
      require('http').request({host: '127.0.0.1', port: 8001, method: 'POST',
        path: '/api/v2/applications/' + TIZENBREW}).end();
    });
  }
  last = now;
}, 5000);
