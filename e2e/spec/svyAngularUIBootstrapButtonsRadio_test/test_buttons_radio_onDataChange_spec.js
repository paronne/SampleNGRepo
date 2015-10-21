describe('test_buttons_radio', function() {
  it('should execute test case without errors', function() {
    var text, value, bool, source, url, title;
    var TestVars = {};
    browser.get("http://localhost:8080/solutions/svyAngularUIBootstrapButtonsRadio_test/index.html?f=buttonsRadio");
	
    value = element(by.xpath("//div[@data-svy-name='buttonsRadio']/div/div[3]/input")).getAttribute('value');
    expect(value).toContain("");
    bool = isElementPresent(by.xpath("//data-angularuibootstrap-buttons-radio[@data-svy-name='buttonsRadio.buttons_radio_1']/div/label[contains(@class,'active')]"));
    expect(bool).toBe(false);
    element(by.xpath("//data-angularuibootstrap-buttons-radio[@data-svy-name='buttonsRadio.buttons_radio_1']/div/label[2]")).click();
    // TODO: waitFor: {expression}
    element(by.xpath("//data-angularuibootstrap-buttons-radio[@data-svy-name='buttonsRadio.buttons_radio_1']/div/label[3]")).click();
    bool = isElementPresent(by.xpath("//data-angularuibootstrap-buttons-radio[@data-svy-name='buttonsRadio.buttons_radio_1']/div/label[2][contains(@class,'active')]"));
    expect(bool).toBe(false);
    // TODO: waitFor: {expression}
    element(by.xpath("//data-angularuibootstrap-buttons-radio[@data-svy-name='buttonsRadio.buttons_radio_1']/div/label")).click();
    // TODO: waitFor: {expression}
    navigate.refresh();
    bool = isElementPresent(by.xpath("//data-angularuibootstrap-buttons-radio[@data-svy-name='buttonsRadio.buttons_radio_1']/div/label[3][contains(@class,'active')]"));
      expect(bool).toBe(true);
    element(by.xpath("//div[@data-svy-name='buttonsRadio']/div/div[3]/input")).sendKeys("2");
    element(by.xpath("//div[@data-svy-name='buttonsRadio']/div/div[3]/input")).sendKeys("0");
    element(by.xpath("//div[@data-svy-name='buttonsRadio']/div/div[3]/input")).sendKeys("1");
  });
});