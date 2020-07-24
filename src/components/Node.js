import React from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  makeStyles,
  Box,
} from "@material-ui/core";
import colors from "../constants/colors";
import Status from "./Status";

const Node = ({ node, expanded, toggleNodeExpanded }) => {
  const classes = useStyles();
  return (
    <ExpansionPanel
      elevation={3}
      className={classes.root}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(node)}
    >
      <ExpansionPanelSummary
        className={classes.summary}
        classes={{
          expandIcon: classes.icon,
          content: classes.content,
          expanded: classes.expanded,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Box className={classes.summaryContent}>
          <Box>
            <Typography variant="h5" className={classes.heading}>
              {node.name || "Unknown"}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.secondaryHeading}
            >
              {node.url}
            </Typography>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {node.loading ? (
          <Typography>Loading...</Typography>
        ) : ((node.blocks && node.blocks.length > 0) ? (
          <Box className={classes.blockContent}>
            {node.blocks.map(block => (
              <Box className={classes.block} key={block.attributes.data}>
                <Typography className={classes.blockIndex}>
                  {"000".substring(0, 3 - block.attributes.index.toString().length) + block.attributes.index}
                </Typography>
                <Typography className={classes.blockData}>{block.attributes.data}</Typography>
              </Box>
            ))}
          </Box>
        ) : (
            <Typography>{node.online ? `No Blocks...` : `It's offline status now`}</Typography>
          )
          )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px 0",
    boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",
    "&:before": {
      backgroundColor: "unset",
    },
  },
  summary: {
    padding: "0 24px",
  },
  summaryContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
  },
  icon: {
    color: colors.faded,
  },
  content: {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  expanded: {
    "& $icon": {
      paddingLeft: 0,
      paddingRight: 12,
      top: -10,
      marginRight: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    display: "block",
    color: colors.text,
    lineHeight: 1.5,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: colors.faded,
    lineHeight: 2,
  },
  blockContent: {
    width: "100%"
  },
  block: {
    width: "100%",
    background: "rgba(0, 0, 0, 0.12)",
    borderRadius: 2,
    padding: "8px 7.72px 8px 8px",
    marginBottom: 8,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
  },
  blockIndex: {
    fontSize: 10,
    lineHeight: "16px",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#304FFE",
  },
  blockData: {
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: 0.25,
    color: "#263238",
  }
}));

Node.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool,
    blocks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
      attributes: PropTypes.shape({
        index: PropTypes.number,
        timestamp: PropTypes.number,
        data: PropTypes.string,
        "previous-hash": PropTypes.string,
        hash: PropTypes.string,
      }),
    }))
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired,
};

export default Node;
