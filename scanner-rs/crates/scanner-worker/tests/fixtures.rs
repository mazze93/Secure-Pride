//! Data-driven regression suite over `scanner-rs/fixtures/*.json`. Per
//! DECISION-003 / respec section 7: every fixture that previously produced
//! a false PASS becomes a permanent regression fixture, and CI fails the
//! build if any of them return PASS.

use scanner_core::{Decision, DEFAULT_MAX_DECODE_DEPTH};
use scanner_worker::scan_text;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct FixtureCase {
    id: String,
    text: String,
    expect: String,
    #[serde(default)]
    #[allow(dead_code)]
    note: Option<String>,
}

fn run_fixture_file(name: &str, json: &str) {
    let cases: Vec<FixtureCase> = serde_json::from_str(json)
        .unwrap_or_else(|e| panic!("failed to parse fixture file {name}: {e}"));
    assert!(!cases.is_empty(), "fixture file {name} has no cases");

    for case in cases {
        let resp = scan_text(&case.text, DEFAULT_MAX_DECODE_DEPTH);
        match case.expect.as_str() {
            "not_pass" => assert_ne!(
                resp.decision,
                Decision::Pass,
                "[{name}::{}] expected non-Pass, got Pass — coverage was {:?}",
                case.id,
                resp.coverage
            ),
            "block" => assert_eq!(
                resp.decision,
                Decision::Block,
                "[{name}::{}] expected Block, got {:?}",
                case.id,
                resp.decision
            ),
            "pass" => assert_eq!(
                resp.decision,
                Decision::Pass,
                "[{name}::{}] expected Pass (benign control), got {:?} with findings {:?}",
                case.id,
                resp.decision,
                resp.findings.iter().map(|f| &f.id).collect::<Vec<_>>()
            ),
            other => panic!("[{name}::{}] unknown expect value: {other}", case.id),
        }
    }
}

macro_rules! fixture_test {
    ($test_name:ident, $file:expr) => {
        #[test]
        fn $test_name() {
            run_fixture_file($file, include_str!(concat!("../../../fixtures/", $file)));
        }
    };
}

fixture_test!(fixtures_unicode, "unicode/cases.json");
fixture_test!(fixtures_multilingual, "multilingual/cases.json");
fixture_test!(fixtures_injection, "injection/cases.json");
fixture_test!(fixtures_pii, "pii/cases.json");
fixture_test!(fixtures_credentials, "credentials/cases.json");
fixture_test!(fixtures_exfil, "exfil/cases.json");
