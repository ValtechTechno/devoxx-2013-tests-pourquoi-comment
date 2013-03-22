import static org.fest.assertions.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Formatter;

import org.junit.Test;

public class AssertionsExamplesTest {

	@Test
	public void should_contains_foo() {
		assertTrue("bar".contains("foo"));
	}

	@Test
	public void should_contains_bar() {
		assertThat("foo").contains("bar");
	}

    @Test
    public void homepage_should_respond_with_bad_assert() {
        int status = 301;
        assertEquals(200, status);
    }

    @Test
    public void homepage_should_respond_with_good_assert() {
        int status = 301;
        assertEquals("La page d’accueil ne répond pas", 200, status);
    }

	@Test
	public void user_password_should_be_properly_hashed() throws NoSuchAlgorithmException, UnsupportedEncodingException {
		// Given
		User user = new User();
		user.setPlainTextPassword("password");
		String salt = "magicstring";

		// When
		String hashedPassword = user.getHashedPassword(salt);

		// Then
		assertThat(hashedPassword).isEqualTo("4ccc91602d266187f8bd12b275ca551154d00729");
	}

	class User {

		private String password;

		public User() {
		}

		public void setPlainTextPassword(String password) {
			this.password = password;
		}

		public String getHashedPassword(String salt) throws NoSuchAlgorithmException, UnsupportedEncodingException {
			return SHAsum((salt + this.password));
		}

		public String SHAsum(String convertme) throws NoSuchAlgorithmException, UnsupportedEncodingException {
			MessageDigest md = MessageDigest.getInstance("SHA-1");
			return byteArray2Hex(md.digest(convertme.getBytes("utf-8")));
		}

		private String byteArray2Hex(final byte[] hash) {
			Formatter formatter = new Formatter();
			for (byte b : hash) {
				formatter.format("%02x", b);
			}
			String result = formatter.toString();
			formatter.close();
			return result;
		}

	}
}
