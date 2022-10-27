import { Component, h, State, Event, EventEmitter } from "@stencil/core";

import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'stock-finder',
    styleUrl: 'stock-finder.css',
    shadow: true
})
export class StockFinder {
    stockNameInput: HTMLInputElement;

    @State() searchResults: { symbol: string, name: string }[] = [];
    @State() loading = false;

    @Event({ bubbles: true, composed: true }) symbolClicked: EventEmitter<string>;

    onFindStocks(event: Event) {
        this.loading = true;
        event.preventDefault();

        const stockName = this.stockNameInput.value
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
            .then(res => res.json())
            .then(parsedRes => {
                this.searchResults = parsedRes['bestMatches'].map(match => {
                    return { name: match['2. name'], symbol: match['1. symbol'] };
                });
                this.loading = false;
            })
            .catch(err => {
                console.log(err);
                this.loading = false;
            })
    }

    clickSymbol(symbol: string) {
        this.symbolClicked.emit(symbol);
    }

    render() {
        let content = <ul>
            {this.searchResults.map(result => (
                <li onClick={this.clickSymbol.bind(this, result.symbol)}>
                    <strong id="stockResultSymbol">{result.symbol}</strong>
                    <div id="stockResultName">{result.name}</div>
                </li>
            ))}
        </ul>;
        if (this.loading) {
            content = <my-spinner />;
        }
        return [
            <form onSubmit={this.onFindStocks.bind(this)}>
                <input
                    id="stock-symbol"
                    ref={el => this.stockNameInput = el}
                />
                <button type="submit">Find</button>
            </form>,
            content
        ];
    }
}