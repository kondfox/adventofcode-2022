package dec_05;

public class Move {

  int amount;
  int from;
  int to;

  public Move(int amount, int from, int to) {
    this.amount = amount;
    this.from = from - 1;
    this.to = to - 1;
  }

  public Move(int[] moveParams) {
    this(moveParams[0], moveParams[1], moveParams[2]);
  }

  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof Move)) return false;
    Move other = (Move) obj;
    return amount == other.amount && from == other.from && to == other.to;
  }

}
