let playerBankroll = 2025;

function getBankroll() {
  return playerBankroll;
}

function updateBankrollDisplay() {
  const bankrollDisplay = document.getElementById("bankroll-display");
  if (bankrollDisplay) {
    bankrollDisplay.textContent = "$" + getBankroll();
  }
}

function setBankroll(newBalance) {
  if (Number.isInteger(newBalance)) {
    playerBankroll = newBalance;
    updateBankrollDisplay();
  } else {
    console.error("setBankroll: newBalance must be an integer.");
  }
}

function timeToBet() {
  const playerActionsSection = document.getElementById("player-actions");
  const bettingSection = document.getElementById("betting");

  if (playerActionsSection) {
    playerActionsSection.classList.add("hidden");
  }
  if (bettingSection) {
    bettingSection.classList.remove("hidden");
  }
  updateBankrollDisplay();
}

function timeToPlay() {
  const playerActionsSection = document.getElementById("player-actions");
  const bettingSection = document.getElementById("betting");

  if (playerActionsSection) {
    playerActionsSection.classList.remove("hidden");
  }
  if (bettingSection) {
    bettingSection.classList.add("hidden");
  }
}

function makeWager() {
  const wagerInput = document.getElementById("users-wager");
  const wager = parseInt(wagerInput.value, 10);

  if (isNaN(wager) || wager <= 0 || !Number.isInteger(wager)) {
    console.error("Invalid wager. Please enter a positive whole number.");
    wagerInput.parentNode.MaterialTextfield.showErrors();
    return;
  }

  if (wager > getBankroll()) {
    console.error("Wager exceeds bankroll. You cannot bet more than you have.");
    wagerInput.parentNode.MaterialTextfield.showErrors();
    return;
  }

  console.log("Wagered amount: $" + wager);
  setBankroll(getBankroll() - wager);

  wagerInput.value = "";
  if (wagerInput.parentNode.MaterialTextfield) {
    wagerInput.parentNode.MaterialTextfield.checkDirty();
    wagerInput.parentNode.MaterialTextfield.checkValidity();
  }

  timeToPlay();
}

window.onload = function () {
  timeToBet();
  if (typeof componentHandler !== "undefined") {
    componentHandler.upgradeDom();
  }
};
