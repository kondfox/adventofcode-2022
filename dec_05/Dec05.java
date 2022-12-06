package dec_05;

import utils.FileIO;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
import java.util.function.BiConsumer;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class Dec05 {

  public static void main(String[] args) {
    System.out.println(findTopCrates("dec_05/input.txt"));
    System.out.println(findTopCrates2("dec_05/input.txt"));
  }

  public static String findTopCrates(String filePath) {
    return findTopCrates(filePath, Dec05::executeMove);
  }

  public static String findTopCrates2(String filePath) {
    return findTopCrates(filePath, Dec05::executeMassMove);
  }

  public static String findTopCrates(String filePath, BiConsumer<List<Deque<String>>, Move> strategy) {
    List<String> fileContent = FileIO.readFile(filePath);
    List<Deque<String>> stacks = parseStacks(fileContent);
    executeMoves(stacks, fileContent, strategy);
    String topCrates = readTopCrates(stacks);
    return topCrates;
  }

  public static List<Deque<String>> parseStacks(List<String> fileContent) {
    List<Deque<String>> stacks = new ArrayList<>();
    for (String row : fileContent) {
      if (row.trim().startsWith("1")) break;
      for (int i = 1, stackI = 0; i < row.length(); i += 4, stackI++) {
        if (stacks.size() == stackI) {
          stacks.add(new LinkedList<>());
        }
        String crate = String.valueOf(row.charAt(i));
        if (crate.trim().isEmpty()) continue;
        stacks.get(stackI).add(crate);
      }
    }
    return stacks;
  }

  public static void executeMoves(List<Deque<String>> stacks,
                                  List<String> fileContent,
                                  BiConsumer<List<Deque<String>>, Move> strategy) {
    boolean isMove = false;
    for (String line : fileContent) {
      if (!isMove && line.isEmpty()) {
        isMove = true;
      } else if (isMove) {
        Move move = parseMove(line);
        strategy.accept(stacks, move);
      }
    }
  }

  public static Move parseMove(String line) {
    int[] moveParams = Arrays.stream(line.split(" "))
            .filter(s -> Pattern.compile("\\d+").matcher(s).matches())
            .mapToInt(s -> Integer.parseInt(s))
            .toArray();
    return new Move(moveParams);
  }

  public static void executeMove(List<Deque<String>> stacks, Move move) {
    for (int i = 0; i < move.amount; i++) {
      String crane = stacks.get(move.from).remove();
      stacks.get(move.to).push(crane);
    }
  }

  public static void executeMassMove(List<Deque<String>> stacks, Move move) {
    Deque<String> temp = new LinkedList<>();
    for (int i = 0; i < move.amount; i++) {
      String crane = stacks.get(move.from).remove();
      temp.push(crane);
    }
    for (String crane : temp) {
      stacks.get(move.to).push(crane);
    }
  }

  private static String readTopCrates(List<Deque<String>> stacks) {
    return stacks.stream()
            .filter(stack -> stack.peek() != null)
            .map(stack -> stack.peek())
            .collect(Collectors.joining());
  }

}
