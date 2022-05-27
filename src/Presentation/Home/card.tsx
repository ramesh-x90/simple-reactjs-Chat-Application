import React from "react";
import { Button } from "react-bootstrap";
import "./MyCard.css";
import MyInViewElement from "Presentation/Core/MyInViewItem/MyInViewElement";

interface MyCardProps {
  index: number;
  data: any;
  className?: string;
}

interface MyCardState {
  styles: React.CSSProperties;
}

class MyCard extends React.Component<MyCardProps, MyCardState> {
  state: MyCardState = { styles: { transform: "rotateY(0deg)" } };
  inView = false;
  intervalId: number = -1;

  ref = React.createRef<MyInViewElement>();

  classes = ["show", "hide"];

  rotate(bol: boolean) {
    bol
      ? this.setState({ styles: { transform: "rotateY(180deg)" } })
      : this.setState({ styles: { transform: "rotateY(0deg)" } });
  }

  updateCssClasses() {
    let i = 0;
    this.intervalId = setInterval(() => {
      if (i % 2 === 0) {
        this.rotate(true);
      } else {
        this.rotate(false);
      }
      i++;
    }, this.props.data * 10000 + 2000);
  }

  componentDidMount() {
    this.updateCssClasses();
  }

  render() {
    return (
      <MyInViewElement
        ref={this.ref}
        className={this.props.className}
        onVisible={() => {
          this.updateCssClasses();
        }}
        onNotVisible={() => {
          try {
            clearInterval(this.intervalId);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <div className="fliping-card-inner" style={this.state.styles}>
          <div
            className="cardImgFront"
            style={{
              backgroundImage: "url(https://picsum.photos/200)",
            }}
          >
            <p>{this.props.data as number}</p>
            <Button> click</Button>
          </div>

          <div
            className="cardImgBack"
            style={{
              backgroundImage: "url(https://picsum.photos/300)",
            }}
          >
            <p>{this.props.data as number}</p>
            <Button> click</Button>
          </div>
        </div>
      </MyInViewElement>
    );
  }
}

export default MyCard;
