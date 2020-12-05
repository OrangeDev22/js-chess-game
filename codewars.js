function spinWords(sentence) {
  let reversedString = sentence.split(" ").map((element) => {
    return element.length > 4 ? element.split("").reverse().join("") : element;
  });
  return reversedString.join(" ");
}
