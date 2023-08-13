NPM_PACKAGE_MANAGER= "npm"
SUPABASE_URL= "https://okrxduhzkryvltkiqqzw.supabase.co"
SUPABASE_KEY= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rcnhkdWh6a3J5dmx0a2lxcXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4NjMwOTYsImV4cCI6MjAwNjQzOTA5Nn0.kWwjFrfN_gD0p7iSnQugIlTQGr3mviRiXZWw6jO64NI"

build-cli:
	mkdir -p build/
	go build \
	-ldflags "-X main.SUPABASE_URL=$(SUPABASE_URL) -X main.SUPABASE_KEY=$(SUPABASE_KEY)" \
	-trimpath \
	-tags=netgo \
	-o="build/openbin-$(GOOS)-$(GOARCH)"

serve-web:
	cp install.sh install.ps1 web/public/
	cd web/; \
	$(NPM_PACKAGE_MANAGER) install; \
	$(NPM_PACKAGE_MANAGER) run-script lint; \
	NEXT_PUBLIC_SUPABASE_URL=$(SUPABASE_URL) NEXT_PUBLIC_SUPABASE_ANON_KEY=$(SUPABASE_KEY) $(NPM_PACKAGE_MANAGER) run-script dev

test: build-cli serve-web

clean:
	rm -r build/
	rm -r web/node_modules/
	rm -r web/.next/
	rm public/install.sh public/install.ps1

# TODO: There *should* be a better way to do this.
release: release-darwin release-linux release-windows

release-darwin: release-darwin-arm64 release-darwin-amd64
release-darwin-arm64: 
	GOOS=darwin GOARCH=arm64 make build-cli
release-darwin-amd64:
	GOOS=darwin GOARCH=amd64 make build-cli

release-linux: release-linux-arm64 release-linux-amd64
release-linux-arm64:
	GOOS=linux GOARCH=arm64 make build-cli
release-linux-amd64:
	GOOS=linux GOARCH=amd64 make build-cli
	
release-windows: release-windows-arm64 release-windows-amd64
release-windows-arm64:
	GOOS=windows GOARCH=amd64 make build-cli
release-windows-amd64:
	GOOS=windows GOARCH=arm64 make build-cli

