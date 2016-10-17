const repl = require('repl');

var replServer = repl.start({
  prompt: '> '
});
replServer.defineCommand('sayhello', {
  help: 'Say hello',
  action: function (name) {
    this.lineParser.reset();
    this.bufferedCommand = '';
    console.log(`Hello, ${name}!`);
    this.displayPrompt();
  }
});
replServer.defineCommand('saybye', function () {
  console.log('Goodbye!');
  this.close();
});
