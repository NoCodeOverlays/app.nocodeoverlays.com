import { useState } from "react";
import { getOverlayData, updateOverlayData } from "../../lib/api";
import { Button, Input, Layout, Sidebar } from "../../components";
import styles from "../../stylesheets/Pages.module.scss";

const EditOverlayPage = ({ data }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [width, setWidth] = useState(data ? data.width : "");
  const [height, setHeight] = useState(data ? data.height : "");

  return (
    <Layout title="Edit Overlay">
      <div className={styles.EditOverlay}>
        <p>Your Preview</p>
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            border: "1px solid black",
          }}
        ></div>
        <Sidebar>
          <div>
            <div>
              <h2>Dimensions</h2>
            </div>
            <Input
              id="width"
              type="number"
              label="Width (px)"
              value={width}
              onChange={setWidth}
            />
            <Input
              id="height"
              type="number"
              label="Height (px)"
              value={height}
              onChange={setHeight}
            />
          </div>
          <Button
            disabled={isSaving}
            onClick={() => {
              setIsSaving(true);
              updateOverlayData({ width, height }).then(() => {
                setIsSaving(false);
              });
            }}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </Sidebar>
      </div>
    </Layout>
  );
};

EditOverlayPage.getInitialProps = async () => {
  const overlayData = await getOverlayData();

  return {
    data: overlayData,
  };
};

export default EditOverlayPage;
