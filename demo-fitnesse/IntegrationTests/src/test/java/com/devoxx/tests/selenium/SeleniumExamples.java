package com.devoxx.tests.selenium;

import static org.fest.assertions.api.Assertions.assertThat;

import java.util.List;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SeleniumExamples {

	@Test
	public void should_list_participan_for_test_session() throws Exception {
		// Given
		WebDriver driver = new FirefoxDriver();
		driver.get("http://localhost:8888");
        WebElement textField = driver.findElement(By.name("session"));
		// When
		textField .sendKeys("TEST");
        textField .submit();
        (new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.findElements(By.cssSelector("table")).size() == 1;
            }
        });

		// Then
		List<WebElement> results = driver.findElements(By.cssSelector("tr.attendeeItem"));
		assertThat(results).hasSize(29);

		driver.quit();
	}
}
