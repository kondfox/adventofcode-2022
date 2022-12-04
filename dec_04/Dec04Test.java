package dec_04;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class Dec04Test {

  @Test
  void countFullOverlaps_should_return_2_when_sampleInputIsGiven() {
    assertEquals(2, Dec04.countFullOverlaps("dec_04/sample-input.txt"));
  }

  @Test
  void countOverlaps_should_return_4_when_sampleInputIsGiven() {
    assertEquals(4, Dec04.countOverlaps("dec_04/sample-input.txt"));
  }

  @Test
  void isFullyOverlapping_should_return_false_when_noOverlappingRangesAreGiven() {
    assertFalse(Dec04.isFullyOverlapping("2-4,6-8"));
  }

  @Test
  void isFullyOverlapping_should_return_false_when_partiallyOverlappingRangesAreGiven() {
    assertFalse(Dec04.isFullyOverlapping("2-6,4-8"));
  }

  @Test
  void isFullyOverlapping_should_return_true_when_fullyOverlappingRangesAreGiven() {
    assertTrue(Dec04.isFullyOverlapping("2-8,3-7"));
  }

  @Test
  void isFullyOverlapping_should_return_true_when_fullyOverlappingReverseRangesAreGiven() {
    assertTrue(Dec04.isFullyOverlapping("3-7,2-8"));
  }

  @Test
  void isFullyOverlapping_should_return_true_when_fullyOverlappingEqualRangesAreGiven() {
    assertTrue(Dec04.isFullyOverlapping("6-6,4-6"));
  }

  @Test
  void isOverlapping_should_return_false_when_noOverlappingRangesAreGiven() {
    assertFalse(Dec04.isOverlapping("2-4,6-8"));
  }

  @Test
  void isOverlapping_should_return_false_when_noOverlappingReverseRangesAreGiven() {
    assertFalse(Dec04.isOverlapping("6-8,2-4"));
  }

  @Test
  void isOverlapping_should_return_true_when_fullyOverlappingRangesAreGiven() {
    assertTrue(Dec04.isOverlapping("2-8,3-7"));
  }

  @Test
  void isOverlapping_should_return_true_when_partiallyOverlappingRangesAreGiven() {
    assertTrue(Dec04.isOverlapping("2-6,4-8"));
  }

  @Test
  void isOverlapping_should_return_true_when_partiallyOverlappingReverseRangesAreGiven() {
    assertTrue(Dec04.isOverlapping("4-8,2-6"));
  }

  @Test
  void isOverlapping_should_return_true_when_touchingRangesAreGiven() {
    assertTrue(Dec04.isOverlapping("6-6,4-6"));
  }

}