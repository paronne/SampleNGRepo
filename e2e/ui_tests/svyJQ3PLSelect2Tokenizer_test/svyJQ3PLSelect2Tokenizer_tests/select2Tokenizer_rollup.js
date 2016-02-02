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
 * Include this file in the Selenium Core extensions (Options > General > Selenium Core Extensions)
 * You can include multiple files in the core extensions but you can create only once a RollupManager.
 */
var manager = new RollupManager();

/**
 * select the item at position x from a select2Tokenizer web component.
 * param: locator the locator to the tokenizer element.
 * param: item the position of the item in list, expressed in number.
 * This rollu stores tokenizer locators in variables
 */
manager.addRollupRule({
    name: 'selectTokenizerItem',
    description: 'Select a tokenizer item, provide tokenizer "locator" and "item" to specify the position, expressed as a number, of the item to be selected in list',
    args: [
         {
            name: 'locator',
            description: 'locator to the tokenizer element'
         }, {
            name: 'item',
            description: 'the position of the item in list to be selected expressed as a number'
         }
    ],
    commandMatchers: [],
    getExpandedCommands: function(args) {
        var tokenizer = args.locator;
        var itemNumber = args.item;

        var tokenizerInput = tokenizer + "//input";
        var select2Item = "//div[contains(@class, 'select2-drop')]/ul/li[contains(@class,'select2-result')][" + itemNumber + "]";

        var commands = [];

        // wait for the tokanizer to be present
        commands.push({
            command: 'waitForElementPresent',
            target: tokenizer,
            value: ''
        });
 
        // click on input to open the dropdown
        commands.push({
            command: 'click',
            target: tokenizerInput,
            value: ''
        });
 
        // wait for the list to show and select the item
        commands.push({
            command: 'waitForElementPresent',
            target: select2Item,
            value: ''
        });
 
        commands.push({
            command: 'assertVisible',
            target: select2Item,
            value: ''
        });

        commands.push({
            command: 'mouseUp',
            target: select2Item,
            value: ''
        });
        return commands;
    }
});

/**
 * store_tokenizer_locators
 *
 * This rollu stores tokenizer locators in variables
 */
manager.addRollupRule({
    name: 'store_tokenizer_locators',
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