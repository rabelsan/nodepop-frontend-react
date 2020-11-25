import React from 'react';

import Layout from '../layout';
import Button from '../shared/Button';
// import defaultPhoto from '../../assets/default_profile.png';

import { createAd } from '../../api/adverts';

import './NewAdPage.css';
import { Redirect } from 'react-router-dom';

const MAX_CHARACTERS = 280;

class NewAdPage extends React.Component {
  state = {
    tweet: { content: '' },
    error: null,
    createdAdId: null,
  };

  textAreaRef = React.createRef();

  handleChange = ({ target: { value } }) => {
    this.setState({ tweet: { content: value } });
  };

  handleSubmit = async ev => {
    const { tweet } = this.state;
    ev.preventDefault();
    try {
      const createdAd = await createAd(tweet);
      this.setState({ createdAdId: createdAd.id });
    } catch (error) {
      this.setState({ error });
    }
  };

  componentDidMount() {
    this.textAreaRef.current.focus();
  }

  render() {
    const {
      tweet: { content },
      createdAdId,
    } = this.state;

    if (createdAdId) {
      return <Redirect to={`/adverts/new/${createdAdId}`} />;
    }

    return (
      <Layout title="What are you thinking?">
        <div
          className="newAdPage bordered"
          style={{ borderBottomWidth: 10 }}
        >
          <div className="left">
            {/* <Photo src={defaultPhoto} alt="" /> */}
          </div>
          <div className="right">
            <form onSubmit={this.handleSubmit}>
              {/* <Textarea
                className="newAdPage-textarea"
                placeholder="Hey! What's up!"
                maxLength={MAX_CHARACTERS}
                value={content}
                onChange={this.handleChange}
                ref={this.textAreaRef}
              /> */}
              <div className="newAdPage-footer">
                <span className="newAdPage-characters">{`${content.length} / ${MAX_CHARACTERS}`}</span>
                <Button
                  type="submit"
                  className="newAdPage-submit"
                  variant="primary"
                  disabled={!content}
                >
                  Let's go!
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

export default NewAdPage;
