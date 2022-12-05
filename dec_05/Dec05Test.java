package dec_05;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class Dec05Test {

  private static final List<String> sampleFileContent = Arrays.asList(
          "    [D]",
          "[N] [C]",
          "[Z] [M] [P]",
          " 1   2   3",
          "",
          "move 1 from 2 to 1",
          "move 3 from 1 to 3",
          "move 2 from 2 to 1",
          "move 1 from 1 to 2"
  );

  @Test
  void findTopCrates_should_return_CMZ_when_sampleInputIsGiven() {
    assertEquals("CMZ", Dec05.findTopCrates("dec_05/sample-input.txt"));
  }

  @Test
  void findTopCrates2_should_return_CMZ_when_sampleInputIsGiven() {
    assertEquals("MCD", Dec05.findTopCrates2("dec_05/sample-input.txt"));
  }

  @Test
  void parseStacks_should_parseStacksCorrectly_when_sampleInputIsGiven() {
    assertIterableEquals(sampleStacks(), Dec05.parseStacks(sampleFileContent));
  }

  @Test
  void executeMoves_should_makeExpectedChangesInStacks_when_sampleInputIsGiven() {
    List<Deque<String>> expected = new ArrayList<>(Arrays.asList(
            new LinkedList<>(Arrays.asList("C")),
            new LinkedList<>(Arrays.asList("M")),
            new LinkedList<>(Arrays.asList("Z", "N", "D", "P"))
    ));
    List<Deque<String>> stacks = sampleStacks();

    Dec05.executeMoves(stacks, sampleFileContent);

    assertIterableEquals(expected, stacks);
  }

  @Test
  void executeMassMoves_should_makeExpectedChangesInStacks_when_sampleInputIsGiven() {
    List<Deque<String>> expected = new ArrayList<>(Arrays.asList(
            new LinkedList<>(Arrays.asList("M")),
            new LinkedList<>(Arrays.asList("C")),
            new LinkedList<>(Arrays.asList("D", "N", "Z", "P"))
    ));
    List<Deque<String>> stacks = sampleStacks();

    Dec05.executeMassMoves(stacks, sampleFileContent);

    assertIterableEquals(expected, stacks);
  }

  @Test
  void findStackAmount_should_return_3_when_sampleInputIsGiven() {
    assertEquals(3, Dec05.findStackAmount(sampleFileContent));
  }

  private List<Deque<String>> sampleStacks() {
    return new ArrayList<>(Arrays.asList(
            new LinkedList<>(Arrays.asList("N", "Z")),
            new LinkedList<>(Arrays.asList("D", "C", "M")),
            new LinkedList<>(Arrays.asList("P"))
    ));
  }

  @Test
  void parseMove_should_returnCorrectMoveObject_when_validStringIsGiven() {
    Move expected = new Move(new int[] {1, 2, 3});
    assertEquals(expected, Dec05.parseMove("move 1 from 2 to 3"));
  }

}