describe('test_record_navigation', function() {
	
 /*  beforeEach(function() {
    browser.get("http://localhost:8080/solutions/servoy_sample_ng_basic/index.html?f=main");
   	browser.wait(function() {
		 return browser.isElementPresent(element(by.xpath("//*[@data-svy-name='frm_nav_top.lblRecord']")));
	}, 80000);
  }); */
  
  
  it('should show the next record', function() {
	browser.get("http://sampleng.eu-gb.mybluemix.net/solutions/servoy_sample_ng_basic/index.html");
	//browser.ignoreSynchronization = true;
   // browser.pause();
   // browser.debugger();
    //browser.waitForAngular();
   	browser.wait(function() {
		return browser.getCurrentUrl().then(function(url) {
      return url === 'http://sampleng.eu-gb.mybluemix.net/solutions/servoy_sample_ng_basic/index.html';
   });
		//return browser.isElementPresent(element(by.xpath("//*[@data-svy-name='lst_nav_main.fldSearch']")));
	});
	
  });
/*	
   	expect(element(by.xpath("//*[@data-svy-name='frm_nav_top.btnNavRight']")).isPresent()).toBe(true);
   	var value = element(by.xpath("//*[@data-svy-name='frm_nav_top.lblRecord']")).getText();
   	expect(value).toBe('Record: 1 of 4');
   	element(by.xpath("//*[@data-svy-name='frm_nav_top.btnNavRight']")).click();
    browser.waitForAngular();
    value = element(by.xpath("//*[@data-svy-name='frm_nav_top.lblRecord']")).getText();
   	expect(value).toBe('Record: 2 of 4');
  });
  
  /*  it('should not show a previous record', function() {
   	expect(element(by.xpath("//*[@data-svy-name='frm_nav_top.btnNavLeft']")).isPresent()).toBe(true);
   	var value = element(by.xpath("//*[@data-svy-name='frm_nav_top.lblRecord']")).getText();
   	expect(value).toBe('Record: 1 of 4');
   	element(by.xpath("//*[@data-svy-name='frm_nav_top.btnNavLeft']")).click();
    browser.waitForAngular();
    value = element(by.xpath("//*[@data-svy-name='frm_nav_top.lblRecord']")).getText();
   	expect(value).toBe('Record: 1 of 4');
  }); */
});