CustomPage.prototype.initialiseComponents = function (layoutItem) {
            var _this = this;
            switch (layoutItem.type) {
                case "heading":
                    var htag = "h" + (layoutItem["level"] || "2");
                    var $h = layoutItem.component = $("<" + htag + " display='block'>").appendTo(layoutItem.$element);
                    $h.text(layoutItem["text"]);
                    break;
                case "navbar":
                    layoutItem.component = new NavBar(layoutItem.$element, this.context, layoutItem, layoutItem.children || []);
                    break;
                case "tree-navigator":
                    layoutItem.component = new TreeNavigatorPanel(layoutItem.$element, this.getClipsModel(layoutItem["clips-model"]));
                    break;
                case "media-panel":
                    //                    layoutItem.$element.addClass("sizeToFit");
                    var autoPlay = layoutItem["auto-play"] === "true";
                    var autoLoad = autoPlay || (layoutItem["auto-load"] === "true");
                    layoutItem.component = new ClipMediaPanel(layoutItem.$element, this.getSelectedClipsModell(layoutItem["selected-clip-model"]), { FullScreen: true }, autoLoad, autoPlay);
                    break;
                case "details-panel":
                    layoutItem.component = new ClipDetailsPanel(layoutItem.$element, this.getSelectedClipsModell(layoutItem["selected-clip-model"]));
                    break;
                case "clips-panel":
                    var viewControlsElementID = layoutItem["view-controls"];
                    var viewClipUrl = layoutItem["view-clip-url"];
                    var clipsPanel = new ClipsPanel(layoutItem.$element, this.getClipsModel(layoutItem["clips-model"]), this.getSelectedClipsModell(layoutItem["selected-clip-model"]), viewControlsElementID, viewClipUrl, false);
                    clipsPanel.setSelectionMode(SelectionMode.Multi);
                    layoutItem.component = clipsPanel;
                    break;
                case "clips-view":
                    var clipsView = new SingleViewClipsPanel(layoutItem.$element, this.getClipsModel(layoutItem["clips-model"]), this.getSelectedClipsModell(layoutItem["selected-clip-model"]), SelectionMode.Single, layoutItem);
                    layoutItem.component = clipsView;
                    break;
                case "summary-panel":
                    layoutItem.component = new ClipSummaryPanel(layoutItem.$element, this.getSelectedClipsModell(layoutItem["selected-clip-model"]), this.fieldLookup, layoutItem.children || []);
                    break;
                case "browse-tabs":
                    layoutItem.component = new BrowseTabsPanel(layoutItem.$element, this.getClipsModel(layoutItem["clips-model"]), layoutItem.children || []);
                    break;
                case "filter-panel":
                    layoutItem.component = new FilterClipsPanel(layoutItem.$element, this.getClipsModel(layoutItem["clips-model"]), layoutItem);
                    break;
                case "html":
                    layoutItem.component = new HtmlPanel(layoutItem.$element, layoutItem);
                    break;
                case "layout":
                case "row":
                case "column":
                case "hsplitter":
                case "vsplitter":
                case "tabs-panel":
                case "tab":
                case "panel":
                    if (layoutItem.type == "vsplitter") {
                        layoutItem.component = new VSplitter(layoutItem.$element, { splitPercentage: layoutItem.split || 50 });
                    }
                    else if (layoutItem.type == "hsplitter") {
                        layoutItem.component = new HSplitter(layoutItem.$element, { splitPercentage: layoutItem.split || 50 });
                    }
                    else if (layoutItem.type == "tabs-panel") {
                        layoutItem.component = new TabsPanel(layoutItem.$element, this.getClipsModel(layoutItem["clips-model"]), layoutItem.children || []);
                    }
                    if (layoutItem.children) {
                        layoutItem.children.forEach(function (child) {
                            _this.initialiseComponents(child);
                        });
                    }
                    if ((layoutItem.component == null) && layoutItem["jsclass"]) {
                        var panelClass = layoutItem["jsclass"];
                        if (panelClass) {
                            layoutItem.component = eval("new " + panelClass + "(layoutItem.$element, this, layoutItem)");
                        }
                    }
                default:
                    break;
            }
            if (layoutItem.component && layoutItem.component instanceof Element && (layoutItem.component.elementId)) {
                this.namedComponents[layoutItem.component.elementId] = layoutItem.component;
            }
        };
