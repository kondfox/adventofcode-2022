package dec_06;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class Dec06Test {

  @Test
  void findFirstStartOfPacketEndPosition_should_return_7_when_mjqjpqmgbljsphdztnvjfqwrcgsmlb_and_4_isGiven() {
    assertEquals(7, Dec06.findFirstStartOfPacketEndPosition("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 4));
  }

  @Test
  void findFirstStartOfPacketEndPosition_should_return_19_when_mjqjpqmgbljsphdztnvjfqwrcgsmlb_and_14_isGiven() {
    assertEquals(19, Dec06.findFirstStartOfPacketEndPosition("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 14));
  }

  @Test
  void findFirstStartOfPacketEndPosition_should_return_5_when_bvwbjplbgvbhsrlpgdmjqwftvncz_and_4_isGiven() {
    assertEquals(5, Dec06.findFirstStartOfPacketEndPosition("bvwbjplbgvbhsrlpgdmjqwftvncz", 4));
  }

  @Test
  void findFirstStartOfPacketEndPosition_should_return_23_when_bvwbjplbgvbhsrlpgdmjqwftvncz_and_14_isGiven() {
    assertEquals(23, Dec06.findFirstStartOfPacketEndPosition("bvwbjplbgvbhsrlpgdmjqwftvncz", 14));
  }

  @Test
  void findFirstStartOfPacketEndPosition_should_return_11_when_zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw_and_4_isGiven() {
    assertEquals(11, Dec06.findFirstStartOfPacketEndPosition("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 4));
  }

  @Test
  void findFirstStartOfPacketEndPosition_should_return_26_when_zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw_and_14_isGiven() {
    assertEquals(26, Dec06.findFirstStartOfPacketEndPosition("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 14));
  }

}