import React from "react";

import { addComment, addReceipt } from "../../Api/Api";
import noreceipt from "../../noreceipt.png";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { Expense as Props } from "../../Api/Types";

interface State {
  receipts: string[];
  activeExpense: boolean;
  commentText: string;
  receiptNumber: number;
  uploadReceipt: any; // This is not sting, its React Element, for now any
  updateComment: any; // same here
}

// Naming of this component is misleading, I thought it was the expense search bar.
// Could be simply `Expense`, `ExpenseRow`, ...
export class ExpenseRow extends React.Component<Props, State> {
  state: State = {
    receipts: [],
    activeExpense: false,
    commentText: "",
    receiptNumber: 0,
    uploadReceipt: "Upload receipt",
    updateComment: "Update comment"
  };

  componentDidMount() {
    if (this.props.receipts.length > 0) {
      this.setState({ receipts: this.props.receipts });
    } else {
      this.setState({ receipts: [noreceipt] });
    }
  }

  // ComponentDidUpdate is an antipattern. The reason you need this right now is because you store the expenses in the state
  // but you do some manipulations to the values. A state library would help on this, or wrapping the expenses outside this component could be good.
  // I suggest reading on async rendering https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.receipts !== state.receipts) {
      if (props.receipts.length > 0) {
        return {
          receipts: props.receipts
        };
      } else {
        return {
          receipts: [noreceipt]
        };
      }
    }
    return null;
  }

  expenseClick = (event: React.MouseEvent): void => {
    this.setState({ activeExpense: !this.state.activeExpense });
  };

  updateCommentText = (event: any) => {
    this.setState({ commentText: event.target.value });
  };

  commentConfirm = async (event: React.MouseEvent): Promise<void> => {
    // add feedback here. Add a spinner or something hooked to a state boolean, like `fetching`
    event.preventDefault();
    await addComment(this.props.id, this.state.commentText);
    this.props.refresh(this.props.id, false, this.state.commentText);
    await this.setState({
      updateComment: (
        <span role="img" aria-label="checkmark">
          ✅
        </span>
      )
    });
    setTimeout((): void => {
      this.setState({ updateComment: "Update comment" });
    }, 2000);
  };

  uploadReceiptButton = (event: React.MouseEvent) => {
    (this.refs.fileUploader as HTMLElement).click();
  };

  uploadReceipt = async (event: any) => {
    // add feedback here. Add a spinner or something hooked to a state boolean, like `uploading`
    this.setState({
      uploadReceipt: (
        <span role="img" aria-label="printer">
          🖨️
        </span>
      )
    });
    await addReceipt(this.props.id, event.target.files[0]);
    await this.props.refresh(this.props.id, true, false);
    await this.setState({
      uploadReceipt: (
        <span role="img" aria-label="checkmark">
          ✅
        </span>
      )
    });
    setTimeout((): void => {
      this.setState({ uploadReceipt: "Upload receipt" });
    }, 2000);
  };

  changeReceipt = (id: string) => {
    if (id === "left" && this.state.receiptNumber > 0) {
      this.setState({ receiptNumber: this.state.receiptNumber - 1 });
    } else if (id === "left" && this.state.receiptNumber === 0) {
      this.setState({ receiptNumber: this.state.receipts.length - 1 });
    } else if (
      id === "right" &&
      this.state.receiptNumber < this.state.receipts.length - 1
    ) {
      this.setState({ receiptNumber: this.state.receiptNumber + 1 });
    } else {
      this.setState({ receiptNumber: 0 });
    }
  };

  render() {
    const { user, amount, merchant } = this.props;
    const { receipts, receiptNumber } = this.state;

    if (this.state.activeExpense === false) {
      return (
        <NoActiveExpense
          expenseClick={this.expenseClick}
          receiptNumber={receiptNumber}
          receipts={receipts}
          {...this.props}
        />
      );
    } else {
      return (
        // You can use the <></> shorthand for <Fragment></Fragment>
        <>
          <div className="active-expense-box">
            <HeaderExpense user={user} amount={amount} merchant={merchant} />
            <div className="mid-box">
              <h6>{this.props.category}</h6>
              <Form>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>
                    <h5>Comment</h5>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="11"
                    type="text"
                    defaultValue={this.props.comment}
                    onChange={this.updateCommentText}
                  />
                </Form.Group>
                <Button
                  variant="warning"
                  type="submit"
                  onClick={this.commentConfirm}
                >
                  {this.state.updateComment}
                </Button>
              </Form>
            </div>

            <ReceiptBox
              receipts={receipts}
              receiptNumber={receiptNumber}
              uploadReceiptButton={this.uploadReceiptButton}
              uploadReceipt={this.uploadReceipt}
              changeReceipt={this.changeReceipt}
            />
          </div>

          <div>
            <Button
              variant="warning"
              size="lg"
              block
              onClick={this.expenseClick}
            >
              Close
            </Button>
          </div>
        </>
      );
    }
  }
}

// you could do all this at the declaration of the component
// Ex export default class ExpenseSearch extends React.Component<Expense> {

const HeaderExpense: React.FC<any> = ({ user, amount, merchant }) => {
  return (
    <div className="expense-text">
      <h4>
        User: {user.first} {user.last}
      </h4>
      <h4>
        Amount: {amount.value} · {amount.currency}{" "}
      </h4>
      <h4>Merchant: {merchant}</h4>
    </div>
  );
};

const ReceiptBox: React.FC<any> = ({
  receipts,
  receiptNumber,
  uploadReceiptButton,
  uploadReceipt,
  changeReceipt
}) => {
  return (
    <div className="receipts-box">
      <img
        className="receipt receipt-active"
        alt="Receipt"
        src={receipts[receiptNumber]}
      />
      <div className="receipt-options">
        <input
          type="file"
          id="file"
          accept="image/*"
          ref="fileUploader"
          style={{ display: "none" }}
          onChange={uploadReceipt}
        />
        <ButtonGroup aria-label="Basic example">
          <Button variant="warning" onClick={() => changeReceipt("left")}>
            <span role="img" aria-label="Left Arrow">
              ⬅️
            </span>
          </Button>
          <Button variant="warning" onClick={uploadReceiptButton}>
            {uploadReceipt}
          </Button>
          <Button variant="warning" onClick={() => changeReceipt("right")}>
            <span role="img" aria-label="Right Arrow">
              ➡️
            </span>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

const NoActiveExpense: React.FC<any> = ({
  expenseClick,
  user,
  amount,
  merchant,
  comment,
  receipts,
  receiptNumber
}) => {
  return (
    <div className="expense-box" onClick={expenseClick}>
      <div className="expense-text">
        <h4>
          User: {user.first} {user.last}
        </h4>
        <h4>
          Amount: {amount.value} · {amount.currency}{" "}
        </h4>
        <h4>Merchant: {merchant}</h4>
        <h5>Comment: {comment} </h5>
      </div>
      <div className="receipts-box">
        <img className="receipt" alt="Receipt" src={receipts[receiptNumber]} />
      </div>
    </div>
  );
};
