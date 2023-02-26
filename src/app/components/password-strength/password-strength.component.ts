import {Component, DoCheck} from '@angular/core';

enum PasswordStrengthEnum {
  Empty = "Empty",
  Easy = "Easy",
  Medium = "Medium",
  Strong = "Strong",
}

enum SectionColorsEnum {
  LightGrey = "lightgrey",
  Red = "red",
  Yellow = "yellow",
  Green = "green",
}

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent implements DoCheck  {
  passwordStrength: PasswordStrengthEnum = PasswordStrengthEnum.Easy;
  passwordTextField: string = "";
  previousPasswordTextField: string = "";
  passwordIsLessThanEightCharacters: boolean = true;
  passwordHasLetters: boolean = false;
  passwordHasSymbols: boolean = false;
  passwordHasDigits: boolean = false;
  firstSectionColor: SectionColorsEnum = SectionColorsEnum.LightGrey;
  secondSectionColor: SectionColorsEnum = SectionColorsEnum.LightGrey;
  thirdSectionColor: SectionColorsEnum = SectionColorsEnum.LightGrey;

  ngDoCheck(): void {
    if (this.passwordTextField !== this.previousPasswordTextField) {
      this.previousPasswordTextField = this.passwordTextField;
      this.checkPasswordStrength();
    }
  }

  checkPasswordStrength() {
    const letterRegex = /[a-zA-Z]/;
    const digitRegex = /\d/;
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

    this.passwordHasLetters = letterRegex.test(this.passwordTextField);
    this.passwordHasDigits = digitRegex.test(this.passwordTextField);
    this.passwordHasSymbols = symbolRegex.test(this.passwordTextField);
    this.passwordIsLessThanEightCharacters = this.passwordTextField.length < 8;

    // Check if password is EMPTY
    if (this.passwordTextField.length === 0) {
      this.firstSectionColor = SectionColorsEnum.LightGrey;
      this.secondSectionColor = SectionColorsEnum.LightGrey;
      this.thirdSectionColor = SectionColorsEnum.LightGrey;
      this.passwordStrength = PasswordStrengthEnum.Empty;
      return;
    }

    // Check if password contains only letters => hence EASY
    if (this.passwordHasLetters && !this.passwordHasDigits && !this.passwordHasSymbols && !this.passwordIsLessThanEightCharacters) {
      this.firstSectionColor = SectionColorsEnum.Red;
      this.secondSectionColor = SectionColorsEnum.LightGrey;
      this.thirdSectionColor = SectionColorsEnum.LightGrey;
      this.passwordStrength = PasswordStrengthEnum.Easy;
      return;
    }

    // Check if password contains only digits => hence EASY
    if (!this.passwordHasLetters && this.passwordHasDigits && !this.passwordHasSymbols && !this.passwordIsLessThanEightCharacters) {
      this.firstSectionColor = SectionColorsEnum.Red;
      this.secondSectionColor = SectionColorsEnum.LightGrey;
      this.thirdSectionColor = SectionColorsEnum.LightGrey;
      this.passwordStrength = PasswordStrengthEnum.Easy;
      return;
    }

    // Check if password contains only symbols => hence EASY
    if (!this.passwordHasLetters && !this.passwordHasDigits && this.passwordHasSymbols && !this.passwordIsLessThanEightCharacters) {
      this.firstSectionColor = SectionColorsEnum.Red;
      this.secondSectionColor = SectionColorsEnum.LightGrey;
      this.thirdSectionColor = SectionColorsEnum.LightGrey;
      this.passwordStrength = PasswordStrengthEnum.Easy;
      return;
    }

    // Check if password is EASY and less than 8 characters
    if (this.passwordIsLessThanEightCharacters) {
      this.firstSectionColor = SectionColorsEnum.Red;
      this.secondSectionColor = SectionColorsEnum.Red;
      this.thirdSectionColor = SectionColorsEnum.Red;
      this.passwordStrength = PasswordStrengthEnum.Easy;
      return;
    }

    // Check if password is MEDIUM
    if ((this.passwordHasLetters && this.passwordHasDigits && !this.passwordHasSymbols) ||
      (this.passwordHasLetters && !this.passwordHasDigits && this.passwordHasSymbols) ||
      (!this.passwordHasLetters && this.passwordHasDigits && this.passwordHasSymbols))  {
      this.firstSectionColor = SectionColorsEnum.Yellow;
      this.secondSectionColor = SectionColorsEnum.Yellow;
      this.thirdSectionColor = SectionColorsEnum.LightGrey;
      this.passwordStrength = PasswordStrengthEnum.Medium;
      return;
    }

    // Check if password is STRONG
    if (this.passwordHasLetters &&
      this.passwordHasDigits &&
      this.passwordHasSymbols &&
      !this.passwordIsLessThanEightCharacters) {
      this.firstSectionColor = SectionColorsEnum.Green;
      this.secondSectionColor = SectionColorsEnum.Green;
      this.thirdSectionColor = SectionColorsEnum.Green;
      this.passwordStrength = PasswordStrengthEnum.Strong;
      return;
    }
  }
}
