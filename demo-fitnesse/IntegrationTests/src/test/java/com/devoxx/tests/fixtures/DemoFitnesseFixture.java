package com.devoxx.tests.fixtures;

import static org.fest.assertions.api.Assertions.assertThat;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import fit.ColumnFixture;

public class DemoFitnesseFixture {

	private WebDriver driver = new FirefoxDriver();
	private WebElement textField;

	public DemoFitnesseFixture(){
		
	}
	
	public void ouvrirLaPage(String url) {
		driver.get(url);
	}

	public void renseignerDansLeChamp(String sessionName, String fieldName) {
		textField = driver.findElement(By.name(fieldName));
		textField.sendKeys(sessionName);
		textField.submit();
	}

	public void attendreLeTableau() {
		(new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
			public Boolean apply(WebDriver d) {
				return d.findElements(By.cssSelector("table")).size() == 1;
			}
		});
	}

	public int leNombreDeLignesEst() {
		List<WebElement> results = driver.findElements(By.cssSelector("tr.attendeeItem"));
		return results.size();
	}
	
	public void fermerLeNavigateur(){
		driver.quit();
	}

}
