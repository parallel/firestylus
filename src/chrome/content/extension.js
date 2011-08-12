FBL.ns(function() { with (FBL) {
    // A map of editor protocols to their string names.
    // Each of these should work with the format "protocol://open?url=%s&line=%s".
    // They should also each have localized strings.
    const editorProtocols = {
        txmt: "Textmate",
        mvim: "MacVim",
        emacs: "Emacs"
    };

    var stringBundle = document.getElementById("firestylus-strings");

    var eps = Components
    	.classes["@mozilla.org/uriloader/external-protocol-service;1"]
        .getService(Ci.nsIExternalProtocolService);
        
    var sl = Firebug.getRep(new FBL.SourceLink());

    function cachestylusDebugInfo(sourceLink) {
        if (sourceLink.type != "css" || sourceLink.stylusDebugInfo) {
            sourceLink.stylusDebugInfo = {};
            return;
        }

        var rules = sourceLink.object.parentStyleSheet.cssRules;
        for(var i=0; i<rules.length-1; i++)
        {
            var styleRule = rules[i+1];
            if (styleRule.type != CSSRule.STYLE_RULE) continue;
            styleRule.stylusDebugInfo = {};

            var mediaRule = rules[i];
            if (mediaRule.type != CSSRule.MEDIA_RULE) continue;

            if (mediaRule.media.mediaText != "-stylus-debug-info") continue;

            for (var j=0; j<mediaRule.cssRules.length; j++)
            {
                styleRule.stylusDebugInfo[mediaRule.cssRules[j].selectorText] =
                    mediaRule.cssRules[j].style.getPropertyValue("font-family");
            }
        }

        sourceLink.stylusDebugInfo = sourceLink.object.stylusDebugInfo || {};
        return;
    }

    sl.getSourceLinkTitle = function(sourceLink)
    {
        if (!sourceLink)
            return "";

        cachestylusDebugInfo(sourceLink);

        try
        {
            var fileName = getFileName(sourceLink.stylusDebugInfo["filename"] || sourceLink.href);
            fileName = decodeURIComponent(fileName);
            fileName = cropString(fileName, 17);
        }
        catch(exc)
        {
        }

        return $STRF("Line", [fileName, sourceLink.stylusDebugInfo["line"] || sourceLink.line]);
    };

    sl.copyLink = function(sourceLink)
    {
        var filename = sourceLink.stylusDebugInfo["filename"];
        if (filename)
        {
            var url = splitURLTrue(filename);
            copyToClipboard(url.path + "/" + url.name);
        }
        else
            copyToClipboard(sourceLink.href);
    };

    sl.getTooltip = function(sourceLink)
    {
        return decodeURI(sourceLink.stylusDebugInfo["filename"] || sourceLink.href);
    };

    var contextMenuItems = sl.getContextMenuItems;
    sl.getContextMenuItems = function(sourceLink, target, context) {
        var items = contextMenuItems(sourceLink, target, context);

        if (!sourceLink.stylusDebugInfo["filename"])
            return items;

        var hasDivider = false;
        for (var protocol in editorProtocols)
        {
            if (!eps.externalProtocolHandlerExists(protocol))
                continue;

            if (!hasDivider){
                items.push("-");
                hasDivider = true;
            }

            items.push({
                label: stringBundle.getString("OpenIn" + editorProtocols[protocol]),
                command: bindFixed(this.openInEditor, this, protocol, sourceLink)
            });
        }

        return items;
    };

    sl.openInEditor = function(protocol, sourceLink) {
        var url = protocol + "://open?";
        var filename = sourceLink.stylusDebugInfo["filename"] || sourceLink.href;
        url += "url=" + encodeURIComponent(filename);

        if (sourceLink.stylusDebugInfo["line"])
            url += "&line=" + sourceLink.stylusDebugInfo["line"];

        FBL.openWindow(url);
    };
}});
