import static org.fest.assertions.api.Assertions.assertThat;

import java.util.List;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SeleniumExamplesTest {

	@Test
	public void google_search_with_a_bad_sleep() throws Exception {
		// Given
		WebDriver driver = new FirefoxDriver();
		driver.get("https://www.google.fr/webhp?hl=en&tab=ww");

		// When
		driver.findElement(By.name("q")).sendKeys("devoxx 2013");
		Thread.sleep(1000); // Wait is a bad practice !

		// Then
		List<WebElement> results = driver.findElements(By.cssSelector("#search li"));
		assertThat(results).hasSize(10);

		driver.quit();
	}

	@Test
	public void google_search_with_a_good_wait() throws Exception {
		// Given
		WebDriver driver = new FirefoxDriver();
		driver.get("https://www.google.fr/webhp?hl=en&tab=ww");

		// When
		driver.findElement(By.name("q")).sendKeys("devoxx 2013");

		(new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
			public Boolean apply(WebDriver d) {
				return d.findElements(By.cssSelector("#search ol#rso")).size() == 1;
			}
		});

		// Then
		List<WebElement> results = driver.findElements(By.cssSelector("#search li"));
		assertThat(results).hasSize(10);
		driver.quit();
	}

}
