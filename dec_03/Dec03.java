package dec_03;

import utils.FileIO;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Dec03 {

  public static void main(String[] args) {
    System.out.println(calculateSumPriorities("dec_03/input.txt"));
    System.out.println(calculateSumBadgePriorities("dec_03/input.txt"));
  }

  public static long calculateSumPriorities(String filePath) {
    List<String> fileContent = FileIO.readFile(filePath);
    long sumPriorities = fileContent.parallelStream()
            .mapToLong(Dec03::calculatePriority)
            .sum();
    return sumPriorities;
  }

  public static long calculateSumBadgePriorities(String filePath) {
    List<String> fileContent = FileIO.readFile(filePath);
    String[] elvenGroup = new String[3];
    long sumBadgePriorities = 0;
    for (int i = 0; i < fileContent.size(); i++) {
      elvenGroup[i % 3] = fileContent.get(i);
      if (i % 3 == 2) {
        String badge = findTheCommonLetter(elvenGroup);
        sumBadgePriorities += calculateElementPriority(badge);
      }
    }
    return sumBadgePriorities;
  }

  public static long calculatePriority(String rucksack) {
    String compartment1 = rucksack.substring(0, rucksack.length() / 2);
    String compartment2 = rucksack.substring(rucksack.length() / 2);
    String commonElement = findTheCommonLetter(compartment1, compartment2);
    int elementPriority = calculateElementPriority(commonElement);
    return elementPriority;
  }

  public static String findTheCommonLetter(String... texts) {
    if (texts == null || texts.length == 0) return "";
    Set<String> commonLetters = toSet(texts[0]);
    for (int i = 1; i < texts.length; i++) {
      commonLetters.retainAll(toSet(texts[i]));
    }
    return commonLetters.toArray(new String[1])[0];
  }

  public static int calculateElementPriority(String element) {
    char e = element.charAt(0);
    int offset = Character.isLowerCase(e) ? (int) 'a' : (int) 'A';
    int base = Character.isLowerCase(e) ? 1 : 27;
    return e - offset + base;
  }

  public static Set<String> toSet(String text) {
    return new HashSet<>(Arrays.asList(text.split("")));
  }

}
