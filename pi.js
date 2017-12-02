var AssistantPi = function() {}

/**
 * @param  {Object} plugins Un objet représentant les autres plugins chargés
 * @return {Promise}
 */
AssistantPi.prototype.init = function(plugins) {
  this.plugins = plugins;
  return Promise.resolve(this);
};

/**
 * Fonction appelée par le système central
 *
 * @param {String} commande La commande envoyée depuis IFTTT par Pushbullet
 * @return {Promise}
 */
AssistantPi.prototype.action = function(commande) {
  var cmd;
  switch (commande) {
    case "reboot": { cmd = "reboot"; break; }
  }

  return new Promise(function(prom_res, p_rej) {
    if(cmd) {
      var exec = require('child_process').exec;
      function puts(error, stdout, stderr) { console.log("[assistant-pi] Erreur : "+stderr) }
      exec(cmd, puts);
      prom_res();
    } else {
      p_rej("[assistant-pi] Erreur : La commande est incorrect !");
    }
  }).then(function() {
    console.log("[assistant-pi] Commande « "+commande+" » exécutée");
  })
};

/**
 * Initialisation du plugin
 *
 * @param  {Object} configuration La configuration
 * @param  {Object} plugins Un objet qui contient tous les plugins chargés
 * @return {Promise} resolve(this)
 */
exports.init=function(configuration, plugins) {
  return new AssistantPi().init(plugins)
  .then(function(resource) {
    console.log("[assistant-pi] Plugin chargé et prêt.");
    return resource;
  })
}
