import React from "react";
import getItem from "Domain/Utility/fakeApi";
import { Container, ProgressBar } from "react-bootstrap";
import MyCard from "./card";
import MyInViewElement from "Presentation/Core/MyInViewItem/MyInViewElement";

interface HomeProps {}

interface HomeState {
  triger: boolean;
  data: any[];
  loading: boolean;
  prograss: number;
}

class Home extends React.Component<HomeProps, HomeState> {
  state: HomeState = { triger: false, data: [], loading: false, prograss: 0 };
  constructor(props: HomeProps) {
    super(props);
    this.apiCall = this.apiCall.bind(this);
  }

  async apiCall() {
    this.setState({ prograss: 0 });
    this.setState({ loading: true });
    getItem(
      20,
      (d) => {
        this.setState({
          data: [...this.state.data, ...d],
          loading: false,
          prograss: 0,
        });
      },
      (i) => {
        this.setState({ prograss: i });
      }
    );
  }

  render() {
    const navbarH = document.querySelector(".navbar")?.clientHeight;

    const classes = ["", "wideGridItem", "longGridItem", "bigGridItem"];

    return (
      <React.Fragment>
        <ProgressBar
          animated
          now={Math.round(this.state.prograss)}
          style={{
            height: "5px",
            position: "sticky",
            backgroundColor: "transparent",
            top: navbarH ? `${navbarH}px` : "60px",
            zIndex: 1000,
          }}
        />

        <Container>
          <div className="sampleGrid">
            {this.state.data.map((it, index) => {
              return (
                <MyCard
                  key={index}
                  index={index}
                  data={it}
                  className={
                    "Mycard " + classes[Math.round(it * 10) % classes.length]
                  }
                />
              );
            })}
          </div>
        </Container>

        <MyInViewElement onVisible={this.apiCall} />
      </React.Fragment>
    );
  }
}

export default Home;
