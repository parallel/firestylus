
clean:
	@rm -rf build

package: clean
	@echo "Packaging the FireStylus extension v$(shell cat Version):\n"
	@mkdir build
	@cp -R src/* Version License.txt Readme.md .zipignore build/
	@cd build ; zip -9 -rm firestylus-$(shell cat Version).xpi . -x@.zipignore
	@echo
	@echo "  output: build/firestylus-$(shell cat Version).xpi\n"
	@echo "  Package done with success !"
	@echo "  To install it, just drap and drop the extension to firefox.\n"

.PHONY: clean
