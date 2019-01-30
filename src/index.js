import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Top extends React.Component{
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
        return(
            <div className="center-queues">
                <div className="queues" >
                    <List
                        items = {this.state.leftList}
                    />
                </div>
                <div className="vertical">
                    <button className="button1" onClick={this.leftClick}>-></button>
                    <button className="button1" onClick={this.rightClick}>&lt;-</button>
                </div>
                <div className="queues">
                    <List
                        items = {this.state.rightList}
                    />
                </div>

                <div className="queues">
                    <List2
                        leftList = {this.state.leftList2}
                        rightList = {this.state.rightList2}
                        leftClick={this.leftClick2}
                        rightClick={this.rightClick2}
                    />
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

    createItem = (i) => {
        return (
            <div>
                <div className="square vertical">
                    {this.props.leftList[i]}
                </div>
                <button className="button2" onClick={() => this.leftClick(i)}>-></button>
                <button className="button2" onClick={() => this.rightClick(i)}>&lt;-</button>
                <div className="square vertical">
                    {this.props.rightList[i]}
                </div>
            </div>
        )
    };
    calcMaxLength = () => {
        return this.props.leftList.length > this.props.rightList.length ? this.props.leftList.length : this.props.rightList.length
    };

    render() {

        let items = [];
        for (let i = 0; i < this.state.length; i++) {
            items.push(this.createItem(i))
        }
        return (
            items
        )
    }
}

// ========================================

ReactDOM.render(
    <Top/>,
    document.getElementById('root')
);

function  initializeList(startValue, size) {
    return Array.apply(null, {length: size}).map(function(value, index){
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


