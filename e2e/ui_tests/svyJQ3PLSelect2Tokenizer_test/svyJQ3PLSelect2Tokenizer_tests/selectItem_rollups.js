/**
 * For use in Selenium IDE.
 *
 * You will need to add this to Selenium under Options / Options in the Selenium Menu.
 * Put this under Selenium Core Extensions:
 * ~/selenium-ide-for-slp/sideflow.js , ~/selenium-ide-for-slp/slp_rollups.js
 *
 *
 */
//var manager = new RollupManager();
 
 
/**
 * store_tokenizer_locators
 *
 * This rollu stores tokenizer locators in variables
 */
manager.addRollupRule({
    name: 'store_tokenizer_locators_2',
    description: 'Store tokenizer locators in variables',
    args: [],
    commandMatchers: [],
    getExpandedCommands: function(args) {
        var commands = [];
 
        commands.push({
            command: 'store',
            target: "//div[contains(@class, 'select2-drop')]",
            value: 'select2drop'
        });
 
        commands.push({
            command: 'store',
            target: "${select2drop}/ul/li[contains(@class,'select2-result')]",
            value: 'select2result_1'
        });
 
        commands.push({
            command: 'store',
            target: "${select2drop}/ul/li[contains(@class,'select2-result')][2]",
            value: 'select2result_2'
        });
 
        commands.push({
            command: 'store',
            target: "${tokenizer}//li[contains(@class,'select2-search-choice')]",
            value: 'select2choice_1'
        });
 
        return commands;
    }
});