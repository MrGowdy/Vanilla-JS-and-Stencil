import { Host, Component, h, State, Element, Prop, Watch, Listen } from '@stencil/core';

import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'stock-price',
  styleUrl: 'stock-price.css',
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;
  initialStockSymbol: string;

  @Element() el: HTMLElement;

  @State() price: number
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() errorMessage: string;
  @State() loading = false;

  @Prop({ mutable: true, reflect: true }) stockSymbol: string;

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    if (this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    //const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;

    //Fetches stock price because of the Watcher
    this.stockSymbol = this.stockInput.value;
  }

  componentWillLoad() {
    console.log('will load');
  }

  componentDidLoad() {
    console.log('did load');
    if (this.stockSymbol) {
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
    }
  }

  componentWillUpdate() {
    console.log('will Update');
  }

  componentDidUpdate() {
    console.log('Did Update');
  }

  disconnectedCallback() {
    console.log('Unloaded');
  }

  @Listen('symbolClicked', { target: 'body' })
  onStockSymbolSelected(event: CustomEvent) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }

  fetchStockPrice(stockSymbol: string) {
    this.loading = true;
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`
    )
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        if (!parsedRes["Global Quote"]["05. price"]) {
          throw new Error('Invalid Symbol');
        }
        this.errorMessage = null;
        this.price = +parsedRes["Global Quote"]["05. price"];
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        this.errorMessage = err.message;
        console.log(err);
      });
  }

  render() {
    let responseContent = <p>Please enter a Symbol</p>;
    if (this.price) {
      responseContent = <p>Price: ${this.price}</p>;
    }
    if (this.errorMessage) {
      responseContent = <p>{this.errorMessage}</p>;
    }
    if (this.loading) {
      responseContent = <my-spinner></my-spinner>;
    }
    return (
      <Host class={this.errorMessage ? 'error' : ''} >
        <form onSubmit={this.onFetchStockPrice.bind(this)}>
          <input
            id="stock-symbol"
            ref={el => this.stockInput = el}
            value={this.stockUserInput}
            onInput={this.onUserInput.bind(this)}
          />
          <button type="submit" disabled={!this.stockInputValid || this.loading}>Fetch</button>
        </form>
        <div>
          {responseContent}
        </div>
      </Host>
    );
  }

}
