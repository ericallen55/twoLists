import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Top extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftList: initializeList(0, 10),
            rightList: initializeList(10, 10),
            leftList2: initializeList(0, 10),
            rightList2: initializeList(10, 10),
        };
        this.leftClick2 = this.leftClick2.bind(this);
        this.rightClick2 = this.rightClick2.bind(this);
    }

    leftClick = () => {
        let obj = moveListElement(this.state.leftList, this.state.rightList, 0);
        this.setState({
                leftList: obj.fromList,
                rightList: obj.tooList,
            }
        );
    };


    rightClick = () => {
        let obj = moveListElement(this.state.rightList, this.state.leftList, 0);
        this.setState({
                leftList: obj.tooList,
                rightList: obj.fromList,
            }
        );
    };

    leftClick2(i) {
        let obj = moveListElement(this.state.leftList2, this.state.rightList2, i);
        this.setState({
                leftList2: obj.fromList,
                rightList2: obj.tooList,
            }
        );
        console.log(this.state.rightList2)
    };

    rightClick2(i) {
        let obj = moveListElement(this.state.rightList2, this.state.leftList2, i);
        this.setState({
                leftList2: obj.tooList,
                rightList2: obj.fromList,
            }
        );
    };

    render() {
        return (
            <div>
                <div className="vertical">
                    <h5>Takes the top item and puts it on the bottom</h5>
                    <div>
                        <div className="queues">
                            <List
                                items={this.state.leftList}
                            />
                        </div>
                        <div className="vertical">
                            <button className="button1" onClick={this.leftClick}>-></button>
                            <button className="button1" onClick={this.rightClick}>&lt;-</button>
                        </div>
                        <div className="queues">
                            <List
                                items={this.state.rightList}
                            />
                        </div>
                    </div>
                </div>

                <div className="vertical">
                    <h5>Places the one selected at the bottom of other list</h5>
                    <div className="queues">
                        <List2
                            leftList={this.state.leftList2}
                            rightList={this.state.rightList2}
                            leftClick={this.leftClick2}
                            rightClick={this.rightClick2}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

class List extends React.Component {
    render() {
        return (
            this.props.items.map((item) =>
                <div className="square">
                    {item}
                </div>)
        )
    }
}

class List2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 20,
        };
        this.leftClick = this.leftClick.bind(this);
    }

    leftClick(i) {
        this.props.leftClick(i);
    };

    rightClick(i) {
        this.props.rightClick(i);
    };

    createLeft = (i) => {
        return (
            <div className="vertical">
                <div className="square vertical">
                    {this.props.leftList[i]}
                </div>
                <button className="button2" onClick={() => this.leftClick(i)}>-></button>
            </div>

        )
    };

    createRight = (i) => {
        return (
            <div className="vertical">
                <button className="button2" onClick={() => this.rightClick(i)}>&lt;-</button>
                <div className="square vertical">
                    {this.props.rightList[i]}
                </div>
            </div>
        )
    };

    render() {
        let left = [];
        let right = [];
        for (let i = 0; i < this.props.leftList.length; i++) {
            left.push(this.createLeft(i))
        }
        for (let i = 0; i < this.props.rightList.length; i++) {
            right.push(this.createRight(i))
        }

        return (
            <div>
                <div className="grid">
                    {left}
                </div>
                <div className="grid">
                    {right}
                </div>
            </div>
        )
    }
}

// ========================================

ReactDOM.render(
    <Top/>,
    document.getElementById('root')
);

function initializeList(startValue, size) {
    return Array.apply(null, {length: size}).map(function (value, index) {
        return index + 1 + startValue;
    });
}

function moveListElement(fromList, tooList, index) {
    let element = fromList.splice(index, 1);
    tooList.push(element[0]);
    return {
        fromList: fromList,
        tooList: tooList
    }
}


