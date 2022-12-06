package dec_06;

import utils.FileIO;

import java.util.Collection;
import java.util.Deque;
import java.util.HashSet;
import java.util.LinkedList;

public class Dec06 {

  public static void main(String[] args) {
    System.out.println(findFirstStartOfPacketEndPosition(FileIO.readFile("dec_06/input.txt").get(0), 4));
    System.out.println(findFirstStartOfPacketEndPosition(FileIO.readFile("dec_06/input.txt").get(0), 14));
  }

  public static int findFirstStartOfPacketEndPosition(String s, int patternLength) {
    Deque<Character> window = new LinkedList<>();
    for (int i = 0; i < s.length(); i++) {
      if (window.size() == patternLength) window.poll();
      window.add(s.charAt(i));
      if (window.size() == patternLength && !hasDuplicate(window)) return i + 1;
    }
    return s.length();
  }

  private static boolean hasDuplicate(Collection<Character> collection) {
    return new HashSet<>(collection).size() != collection.size();
  }

}
