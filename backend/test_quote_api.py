#!/usr/bin/env python3
"""
Simple test script for the quote generation API
"""

import requests
import json
import sys

def test_quote_api():
    """Test the quote generation API endpoint"""

    api_url = "http://localhost:8001/api/generate-quote"

    # Test themes
    test_themes = ["Love", "Wisdom", "Success", "Hope", "Motivation"]

    print("🧪 Testing Quote Generation API")
    print("=" * 50)

    for theme in test_themes:
        print(f"\n🎯 Testing theme: {theme}")

        try:
            # Make API request
            response = requests.post(
                api_url,
                json={"theme": theme},
                timeout=30
            )

            if response.status_code == 200:
                data = response.json()

                if data.get("success"):
                    print(f"✅ Success!")
                    print(f"Quote: \"{data['quote']}\"")
                    print(f"Author: {data['author']}")
                else:
                    print(f"❌ API returned error: {data.get('error', 'Unknown error')}")

            else:
                print(f"❌ HTTP Error {response.status_code}: {response.text}")

        except requests.exceptions.Timeout:
            print(f"⏰ Timeout - API took too long to respond")
        except requests.exceptions.ConnectionError:
            print(f"🔌 Connection Error - Is the backend server running on port 8001?")
        except Exception as e:
            print(f"💥 Unexpected error: {str(e)}")

    print("\n" + "=" * 50)
    print("🏁 Test completed!")

if __name__ == "__main__":
    test_quote_api()