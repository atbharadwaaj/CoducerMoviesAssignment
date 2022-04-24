import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  Input,
  Button,
  Badge 
} from 'reactstrap';
import WatchListModal from './watchlistModal';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dropdownOpen: false,
      searchCategory: 'Title',
      showWatchList: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleCategoryChange = (category) => {
    this.setState({
      searchCategory: category
    });
  }

  toggleWatchList = () => {
    this.setState({
      showWatchList: !this.state.showWatchList
    });
  }

  render() {
    return (
      <>
        <WatchListModal
          showBookMarked={this.state.showWatchList}
          toggleWatchlist={this.toggleWatchList}
          movieList={this.props.watchListMovies}
          allMovieList={this.props.completeMovies}
        />
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">CoducerMovies</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="w-100 ml-auto" navbar>
                <InputGroup className="mt-2 mb-2">
                  <ButtonDropdown 
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggleDropdown} 
                  >
                    <DropdownToggle caret>
                      {this.state.searchCategory}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Select Category</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={() => this.handleCategoryChange('Rank')} value='Rank'>Rank</DropdownItem>
                      <DropdownItem onClick={() => this.handleCategoryChange('Rating')} value='Rating'>Rating</DropdownItem>
                      <DropdownItem onClick={() => this.handleCategoryChange('Title')} value='Title'>Title</DropdownItem>
                      <DropdownItem onClick={() => this.handleCategoryChange('Year')} value='Year'>Year</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                  <Input 
                    type="text" 
                    onChange={(e) => this.props.searchCallBack(this.state.searchCategory, e.target.value)} 
                    placeholder="Search CoducerMovies"
                  />
                </InputGroup>
                <NavItem className="mt-2">
                  <Button 
                    style={{marginLeft: '10px', width: '145px'}}
                    color="secondary"
                    onClick={() => this.setState({showWatchList: true})}
                  >
                    <span>
                      <i className="fa fa-bookmark"></i> Watchlist
                        <Badge color="warning" style={{marginLeft: '5px'}}>
                          {this.props.watchListMovies.length}
                        </Badge>
                    </span>
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </>
    );
  }
}

export default Header;