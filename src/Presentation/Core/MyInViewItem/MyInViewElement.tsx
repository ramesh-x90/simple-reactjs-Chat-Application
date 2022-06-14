import React from "react";

interface MyInViewElementProps {
  children?: React.ReactNode;
  className?: string;
  threshold?: number;
  style?: React.CSSProperties;
  onVisible?: () => void;
  onNotVisible?: () => void;
}

interface MyInViewElementState {
  classes: string;
}

interface observerEventType {
  type: "show" | "hideInTop" | "hideInBottom";
}

class MyInViewElement extends React.Component<
  MyInViewElementProps,
  MyInViewElementState
> {
  ref = React.createRef<HTMLDivElement>();
  inView = false;
  threshold = this.props.threshold ? this.props.threshold : 0;

  observerclasses = {
    show: "MyInViewElementShow",
    hideDown: "hideDown",
    hideUp: "hideUp",
  };

  constructor(props: MyInViewElementProps) {
    super(props);
    this.state = { classes: this.observerclasses.hideDown };
  }

  getClasses(): string | undefined {
    if (this.props.className) {
      return this.props.className + " " + this.state.classes;
    }
    return this.state.classes;
  }

  setClass(name: string) {
    this.setState({ classes: name });
  }
  showElement() {
    this.setClass(this.observerclasses.show);
  }

  hidingInTop() {
    this.setClass(this.observerclasses.hideUp);
  }

  hidingInBottom() {
    this.setClass(this.observerclasses.hideDown);
  }

  async onVisibleCallBackCall() {
    if (this.props.onVisible) {
      this.props.onVisible();
    }
  }

  async onNotVisibleCallBackCall() {
    if (this.props.onNotVisible) {
      this.props.onNotVisible();
    }
  }

  observerEvent(event: observerEventType) {
    switch (event.type) {
      case "show":
        this.showElement();
        break;

      case "hideInTop":
        this.hidingInTop();
        break;

      case "hideInBottom":
        this.hidingInBottom();
        break;

      default:
        break;
    }
  }

  observer = new IntersectionObserver(
    (entries) => {
      const it = entries[0];
      this.inView = it.isIntersecting;
      if (it.isIntersecting) {
        setTimeout(() => {
          this.observerEvent({ type: "show" });
        }, Math.random() * 500);
        this.onVisibleCallBackCall();
      } else {
        this.onNotVisibleCallBackCall();
        if (it.boundingClientRect.top > 0) {
          this.observerEvent({ type: "hideInBottom" });
        } else {
          this.observerEvent({ type: "hideInTop" });
        }
      }
    },
    {
      threshold: this.threshold,
      rootMargin: this.props.onVisible ? "100px" : undefined,
    }
  );

  componentDidMount() {
    this.observer.observe(this.ref.current as Element);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {
    return (
      <div
        ref={this.ref}
        className={this.getClasses()}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}

export default MyInViewElement;
