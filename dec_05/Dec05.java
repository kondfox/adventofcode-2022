package dec_05;

import utils.FileIO;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class Dec05 {

  public static void main(String[] args) {
    System.out.println(findTopCrates("dec_05/input.txt"));
    System.out.println(findTopCrates2("dec_05/input.txt"));
  }

  public static String findTopCrates(String filePath) {
    List<String> fileContent = FileIO.readFile(filePath);
    List<Deque<String>> stacks = parseStacks(fileContent);
    executeMoves(stacks, fileContent);
    String topCrates = readTopCrates(stacks);
    return topCrates;
  }

  public static String findTopCrates2(String filePath) {
    List<String> fileContent = FileIO.readFile(filePath);
    List<Deque<String>> stacks = parseStacks(fileContent);
    executeMassMoves(stacks, fileContent);
    String topCrates = readTopCrates(stacks);
    return topCrates;
  }

  private static String readTopCrates(List<Deque<String>> stacks) {
    return stacks.stream()
            .filter(stack -> stack.peek() != null)
            .map(stack -> stack.peek())
            .collect(Collectors.joining());
  }


  public static List<Deque<String>> parseStacks(List<String> fileContent) {
    int stackAmount = findStackAmount(fileContent);
    List<Deque<String>> stacks = initStacks(stackAmount);
    fillStacks(stacks, fileContent);
    return stacks;
  }

  public static void executeMoves(List<Deque<String>> stacks, List<String> fileContent) {
    boolean isMove = false;
    for (String line : fileContent) {
      if (!isMove && line.isEmpty()) {
        isMove = true;
      } else if (isMove) {
        Move move = parseMove(line);
        executeMove(stacks, move);
      }
    }
  }

  public static void executeMassMoves(List<Deque<String>> stacks, List<String> fileContent) {
    boolean isMove = false;
    for (String line : fileContent) {
      if (!isMove && line.isEmpty()) {
        isMove = true;
      } else if (isMove) {
        Move move = parseMove(line);
        executeMassMove(stacks, move);
      }
    }
  }

  private static void executeMove(List<Deque<String>> stacks, Move move) {
    for (int i = 0; i < move.amount; i++) {
      String crane = stacks.get(move.from).remove();
      stacks.get(move.to).push(crane);
    }
  }

  private static void executeMassMove(List<Deque<String>> stacks, Move move) {
    Deque<String> temp = new LinkedList<>();
    for (int i = 0; i < move.amount; i++) {
      String crane = stacks.get(move.from).remove();
      temp.push(crane);
    }
    for (String crane : temp) {
      stacks.get(move.to).push(crane);
    }
  }

  public static Move parseMove(String line) {
    int[] moveParams = Arrays.stream(line.split(" "))
            .filter(s -> Pattern.compile("\\d+").matcher(s).matches())
            .mapToInt(s -> Integer.parseInt(s))
            .toArray();
    return new Move(moveParams);
  }

  public static int findStackAmount(List<String> fileContent) {
    for (String line : fileContent) {
      String trimmedLine = line.trim();
      if (trimmedLine.startsWith("1")) {
        return Integer.parseInt(trimmedLine.substring(trimmedLine.length() - 1));
      }
    }
    return 0;
  }

  private static List<Deque<String>> initStacks(int stackAmount) {
    List<Deque<String>> stacks = new ArrayList<>();
    for (int i = 0; i < stackAmount; i++) {
      stacks.add(new LinkedList<>());
    }
    return stacks;
  }

  private static void fillStacks(List<Deque<String>> stacks, List<String> fileContent) {
    for (String line : fileContent) {
      if (line.trim().startsWith("1")) break;
      for (int i = 1, stackI = 0; i < line.length(); i += 4, stackI++) {
        String crate = String.valueOf(line.charAt(i));
        if (!crate.trim().isEmpty()) {
          stacks.get(stackI).add(crate);
        }
      }
    }
  }

}
