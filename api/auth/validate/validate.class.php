<?php

    // * check() To check whether the inputs are empty or not
    // * int() To validate integers
    // * str() To escape html characters and trim a string
    // * bool() To convert any variable to boolean
    // * email() To validate emails
    // * url() To validate URLs

    // * validate an integer -> $number = Validate::int($_POST['number']);
    // * validate a string -> $name = Validate::str($_POST['name']);
    // * convert to boolean -> $bool = Validate::bool($_POST['boolean']);
    // * validate an email -> $email = Validate::email($_POST['email']);
    // * validate a URL -> $url = Validate::url($_POST['url']);
    // * validate a pwd -> $pwd = Validate::pwd($_POST['url']);

class Validate {
	static $errors = true;

	static function check($arr, $on = false) {
		if ($on === false) {
			$on = $_REQUEST;
		}
		foreach ($arr as $value) {
			if (empty($on[$value])) {
				self::throwError('Data is missing', 900);
			}
		}
	}

	static function int($val) {
		$val = filter_var($val, FILTER_VALIDATE_INT);
		if ($val === false) {
			self::throwError('Invalid Integer', 901);
		}
		return $val;
	}

	static function str($val) {
		if (!is_string($val)) {
			self::throwError('Invalid String', 902);
		}
		$val = trim(htmlspecialchars($val));
		return $val;
	}

	static function pwd($val) {
        $val = filter_var($val, FILTER_SANITIZE_STRING);
		return $val;
	}

	static function bool($val) {
		$val = filter_var($val, FILTER_VALIDATE_BOOLEAN);
		return $val;
	}

	static function email($val) {
		$val = filter_var($val, FILTER_VALIDATE_EMAIL);
		if ($val === false) {
			self::throwError('Invalid Email', 903);
		}
		return $val;
	}

	static function url($val) {
		$val = filter_var($val, FILTER_VALIDATE_URL);
		if ($val === false) {
			self::throwError('Invalid URL', 904);
		}
		return $val;
	}

	static function throwError($error = 'Error In Processing', $errorCode = 0) {
		if (self::$errors === true) {
			throw new Exception($error, $errorCode);
		}
	}
}