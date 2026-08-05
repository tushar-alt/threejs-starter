/**
 * counter.js -- Click Counter Utility
 *
 * Attaches a click-based counter to a given DOM element.
 * Each click increments the displayed count by one.
 */

/**
 * Sets up an interactive counter on the given DOM element.
 * @param {HTMLElement} element - The target element to display and interact with the counter.
 */
export function setupCounter(element) {
  // Internal counter state
  let counter = 0;

  /**
   * Updates the counter value and refreshes the element's inner HTML.
   * @param {number} count - The new counter value to display.
   */
  const setCounter = (count) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };

  // Increment the counter on each click
  element.addEventListener("click", () => setCounter(counter + 1));

  // Initialize the display at zero
  setCounter(0);
}
